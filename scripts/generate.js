var fs = require('fs');
var path = require('path');
var util = require('gulp-util');
var through2 = require('through2');
var dependencies = require('./dependencies.json');
var banner = require('./banner');
var pkg = require('../package.json');
var version = process.env.VERSION || pkg.version;

var IMPORT_SNIPPET = `import {{displayName}} from './{{fileName}}/index'`;
var VAR_SNIPPET = `const {{displayName}} = (selector = '{{selector}}', ctx) => getCtx(selector, ctx)`;
var REFRESHER_VAR_SNIPPET = `const $startWuxRefresher = (selector = '#wux-refresher', ctx) => getCtx(selector, ctx).triggerRefresh()
const $stopWuxRefresher = (selector = '#wux-refresher', ctx) => getCtx(selector, ctx).finishPullToRefresh()
const $stopWuxLoader = (selector = '#wux-refresher', ctx, isEnd) => getCtx(selector, ctx).finishLoadmore(isEnd)`;
var REFRESHER_EXPORT_SNIPPET = ['$startWuxRefresher', '$stopWuxRefresher', '$stopWuxLoader'].join(',\n\t');

function getName(v) {
    if (v === 'version') return 'version';
    var others = {
        actionsheet: 'action-sheet',
        keyboard: 'key-board',
        countdown: 'count-down',
        countup: 'count-up',
    };
    var toUpper = function (val) {
        return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
    };
    v = others[v] || v;
    v = v.split('-').map(function(val) { return toUpper(val) }).join('');
    return `$wux${v}`;
}

function getFiles(files) {
    return files.map(function(v) {
        return {
            displayName: getName(v),
            fileName: v,
            selector: `#wux-${v}`,
        }
    });
}

function esm(snippet, options) {
    return snippet.replace(/{{banner}}/g, options.banner)
        .replace(/{{componentImports}}/g, options.componentImports)
        .replace(/{{componentAliases}}/g, options.componentAliases)
        .replace(/{{componentExports}}/g, options.componentExports)
}

function getFileString(snippet, opts) {
    var importFiles = opts.importFiles || [];
    var exportFiles = opts.exportFiles || [];
    var files = importFiles.concat(exportFiles);
    var extra = getFiles(importFiles);
    var data = getFiles(exportFiles);
    var componentImports = extra.map(function(v) { return inspectFile(IMPORT_SNIPPET, v) }).join('\n');
    var componentAliases = `const version = '{{version}}'`.replace(/{{version}}/, version) + '\n';
    componentAliases = componentAliases + data.map(function(v) {
        if (v.fileName === 'refresher') {
            return REFRESHER_VAR_SNIPPET
        }
        return inspectFile(VAR_SNIPPET, v)
    }).join('\n');
    var componentExports = ['version'].concat(files).map(function(v) {
        if (v === 'refresher') {
            return REFRESHER_EXPORT_SNIPPET
        }
        return getName(v)
    }).join(',\n\t');
    var options = {
        banner: banner.trim(),
        componentImports: componentImports,
        componentAliases: componentAliases,
        componentExports: componentExports,
    };
    var result = esm(snippet, options);
    return result;
}

function getOptions(files) {
    var exclude = ['countdown', 'countup'];
    var include = ['actionsheet', 'backdrop', 'toast', 'loading', 'dialog', 'form', 'toptips', 'gallery', 'notification', 'keyboard', 'select', 'calendar', 'refresher'];
    var importFiles = exclude.filter(function(v) { return files.includes(v) });
    var exportFiles = files.filter(function(v) { return include.includes(v) });
    return {
        importFiles: importFiles,
        exportFiles: exportFiles,
    }
}

function generateScript(files) {
    return through2.obj(function(file, encoding, cb) {

        // 如果文件为空，不做任何操作，转入下一个操作，即下一个pipe
        if (file.isNull()) {
            this.push(file)
            return cb()
        }

        // 插件不支持对stream直接操作，抛出异常
        if (file.isStream()) {
            this.emit('error', new util.PluginError('generateScript', 'Streaming not supported'))
            return cb()
        }

        // 内容转换，处理好后，再转成 Buffer 形式
        var snippet = file.contents.toString()
        var content = getFileString(snippet, getOptions(files || []))

        file.contents = typeof Buffer.from === 'function' ? Buffer.from(content) : new Buffer(content)

        // 下面这两句基本是标配，可参考 through2 的 API
        this.push(file)
        cb()
    })
}

function generateStyle(themes, options) {
    return through2.obj(function(file, encoding, cb) {

        // 如果文件为空，不做任何操作，转入下一个操作，即下一个pipe
        if (file.isNull()) {
            this.push(file)
            return cb()
        }

        // 插件不支持对stream直接操作，抛出异常
        if (file.isStream()) {
            this.emit('error', new util.PluginError('generateStyle', 'Streaming not supported'))
            return cb()
        }

        // Include folder
        if (options && options.include && !file.relative.match(options.include)) {
            return cb()
        }

        // 内容转换，处理好后，再转成 Buffer 形式
        var snippet = file.contents.toString()
        var content = inspectLess(snippet, themes || [])

        file.contents = typeof Buffer.from === 'function' ? Buffer.from(content) : new Buffer(content)

        // 下面这两句基本是标配，可参考 through2 的 API
        this.push(file)
        cb()
    })
}

function generateColor(themes, options) {
    return through2.obj(function(file, encoding, cb) {

        // 如果文件为空，不做任何操作，转入下一个操作，即下一个pipe
        if (file.isNull()) {
            this.push(file)
            return cb()
        }

        // 插件不支持对stream直接操作，抛出异常
        if (file.isStream()) {
            this.emit('error', new util.PluginError('generateStyle', 'Streaming not supported'))
            return cb()
        }

        // 内容转换，处理好后，再转成 Buffer 形式
        var snippet = file.contents.toString()
        var content = inspectColor(snippet, themes || [])

        file.contents = typeof Buffer.from === 'function' ? Buffer.from(content) : new Buffer(content)

        // 下面这两句基本是标配，可参考 through2 的 API
        this.push(file)
        cb()
    })
}

function getModifyVars(themes) {
    return Object.keys(themes).reduce(function(acc, name) {
        acc[name.indexOf('@') === 0 ? name.slice(1) : name] = themes[name]
        return acc
    }, {})
}

function inspectColor(snippet, themes) {
    return Object.keys(themes).reduce(function(acc, name) {
        return acc.replace(new RegExp(`('${name}':).+(,)`), `$1 '${themes[name]}'$2`)
    }, snippet)
}

function inspectLess(snippet, themes) {
    return Object.keys(themes).reduce(function(acc, name) {
        return acc.replace(new RegExp(`(\@${name}:).+(;)`), `$1 ${themes[name]}$2`)
    }, snippet)
}

function unique(arr) {
    return arr.filter(function(v, i) {
        return arr.indexOf(v) === i
    })
}

function getFilesByName(name) {
    if (dependencies[name] === undefined) return [];
    return dependencies[name].dependencies.reduce(function(acc, depName) {
        return acc.concat(getFilesByName(depName))
    }, dependencies[name].files)
}

function getFilesByNames(names) {
    return unique(names.reduce(function(acc, name) {
        return acc.concat(getFilesByName(name))
    }, []))
}

/**
 * Create Folder
 */
function mkdirs(dirname, callback) {
    fs.exists(dirname, function (exists) {
        if (exists) {
            callback();
        } else {
            mkdirs(path.dirname(dirname), function () {
                fs.mkdir(dirname, callback);
            });
        }
    });
}

/**
 * Write File
 */
function writeFile(fileName, fileString) {
    fs.writeFile(fileName, fileString, function(err) {
        if (err) {
            console.error('error writeFile:', err);
            return;
        }
        console.log('success writeFile: generate index.js');
    });
}

/**
 * Inspect File
 */
function inspectFile(snippet, options) {
    return snippet.replace(/{{displayName}}/g, options.displayName)
        .replace(/{{fileName}}/g, options.fileName)
        .replace(/{{selector}}/g, options.selector)
}

module.exports.generateScript = generateScript;
module.exports.generateStyle = generateStyle;
module.exports.generateColor = generateColor;
module.exports.getModifyVars = getModifyVars;
module.exports.getFilesByNames = getFilesByNames;
module.exports.mkdirs = mkdirs;
