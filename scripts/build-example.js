import path from 'path'
import gulp from 'gulp'
import * as utils from './build-utils'
import getOutput from './get-output'

const srcPath = path.join(__dirname, '../src')
const buildPath = `${getOutput()}/dist`
const files = utils.files

const paths = {
    styles: {
        src: [`${srcPath}/**/*.less`],
        dest: buildPath,
    },
    colors: {
        src: [`${srcPath}/helpers/colors.js`],
        dest: buildPath,
    },
    copy: {
        src: [`${srcPath}/**`, `!${srcPath}/**/*.less`, `!${srcPath}/icon/fonts/**`],
        dest: buildPath,
    },
}

paths.styles.src = [
    `${srcPath}/styles/*.less`,
    ...files.map((v) => `${srcPath}/${v}/*.less`),
]
paths.copy.src = [
    ...files.map((v) => `${srcPath}/${v}/**`),
    `!${srcPath}/**/*.less`,
    `!${srcPath}/icon/fonts/**`,
    `${srcPath}/helpers/*.js`,
    // `${srcPath}/index.js`,
    // `${srcPath}/config.json`,
]

const styles = utils.styles(paths.styles, srcPath, false)
const copy = utils.copy(paths.copy, srcPath)
const colors = utils.generateColors(paths.colors, srcPath, false)

const watchFiles = () => {
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.copy.src, copy)
}

export { watchFiles as watch }

export default gulp.series(
    gulp.parallel(
        styles,
        copy,
        utils.generateFiles(buildPath, false),
        utils.generateConfig(buildPath),
    ),
    colors,
    watchFiles,
)
