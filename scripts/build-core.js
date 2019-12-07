import path from 'path'
import gulp from 'gulp'
import * as utils from './build-utils'
import getOutput from './get-output'

const srcPath = path.join(__dirname, '../src')
const buildPath = `${getOutput()}/core`
const files = utils.files

const paths = {
    // styles: {
    //     src: [`${srcPath}/styles/themes/default.less`],
    //     dest: buildPath,
    // },
    copy: {
        src: [`${srcPath}/**`],
        dest: buildPath,
    },
}

paths.copy.src = ['styles', 'helpers', ...files].map((v) => `${srcPath}/${v}/**`)

export default gulp.series(
    gulp.parallel(
        utils.copy(paths.copy, srcPath),
        utils.generateFiles(buildPath, false),
        utils.generateConfig(buildPath),
    ),
    // utils.themes(paths.styles, srcPath),
)
