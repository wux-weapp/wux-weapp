import path from 'path'
import gulp from 'gulp'
import * as utils from './build-utils'
import getOutput from './get-output'

const srcPath = `${getOutput()}/core`
const buildPath = `${getOutput()}/lib`
const files = utils.files

const paths = {
    styles: {
        src: [`${srcPath}/**/*.less`],
        dest: buildPath,
    },
    scripts: {
        src: [`${srcPath}/**/*.js`],
        dest: buildPath,
    },
    colors: {
        src: [`${srcPath}/helpers/colors.js`],
        dest: buildPath,
    },
    copy: {
        src: [`${srcPath}*`],
        dest: buildPath,
    },
}

paths.styles.src = [
    `${srcPath}/styles/*.less`,
    ...files.map((v) => `${srcPath}/${v}/*.less`),
]
paths.scripts.src = [
    ...['helpers', ...files].map((v) => `${srcPath}/${v}/*.js`),
    `${srcPath}/index.js`,
]
paths.copy.src = [
    ...files.map((v) => `${srcPath}/${v}/**`),
    `!${srcPath}/**/*.less`,
    `!${srcPath}/icon/fonts/**`,
    // `${srcPath}/helpers/*.js`,
    // `${srcPath}/index.js`,
    `${srcPath}/config.json`,
]

export default gulp.series(
    gulp.parallel(
        utils.styles(paths.styles, srcPath, true),
        utils.copy(paths.copy, srcPath),
        // utils.generateFiles(buildPath, true),
        // utils.generateConfig(buildPath),
    ),
    utils.scripts(paths.scripts, srcPath),
    utils.generateColors(paths.colors, srcPath, true),
)
