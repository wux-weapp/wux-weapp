import fs from 'fs'
import path from 'path'
import gulp from 'gulp'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import less from 'gulp-less'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import postcss from 'gulp-postcss'
import cssnano from 'gulp-cssnano'
import autoprefixer from 'autoprefixer'
import del from 'del'
import px2Rpx from './px2Rpx'
import getConfig from './get-core-config'
import { generateScript, generateStyle, generateColor, getModifyVars, getFilesByNames, mkdirs } from './generate'

export const config = getConfig()
export const files = getFilesByNames(config.components || [])
export const modifyVars = getModifyVars(config.themes || {})
export const tplPath = path.join(__dirname, '../src/index.js.tpl')

/**
 * Generate config.json
 */
export const generateConfig = (dest) => (cb) => {
    mkdirs(dest, () => {
        fs.writeFile(`${dest}/config.json`, JSON.stringify(config, null, 4), (err) => {
            if (cb) cb()
            if (err) console.error(err)
        })
    })
}

/**
 * Generate index.js
 */
export const generateFiles = (dest, compress) => {
    if (!compress) {
        return () => (
            gulp.src(tplPath)
            .pipe(generateScript(files))
            .pipe(rename({ basename: 'index', extname: '.js' }))
            .pipe(gulp.dest(dest))
        )
    }

    return () => (
        gulp.src(tplPath)
        .pipe(generateScript(files))
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({ basename: 'index', extname: '.js' }))
        .pipe(gulp.dest(dest))
    )
}

/**
 * Generate colors.js
 */
export const generateColors = (paths, base, compress) => {
    if (!compress) {
        return () => (
            gulp.src(paths.src, { base })
            .pipe(generateColor(modifyVars))
            .pipe(gulp.dest(paths.dest))
        )
    }

    return () => (
        gulp.src(paths.src, { base })
        .pipe(generateColor(modifyVars))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest))
    )
}

/**
 * Customized theme
 */
export const themes = (paths, base) => () => (
    gulp
    .src(paths.src, { base })
    .pipe(generateStyle(modifyVars))
    .pipe(gulp.dest(paths.dest))
)

/**
 * Clean files
 */
export const clean = (dest) => () => del([dest])

/**
 * Build styles
 */
export const styles = (paths, base, format) => () => (
    gulp
    .src(paths.src, { base })
    .pipe(less({ modifyVars }))
    .pipe(px2Rpx())
    .pipe(postcss())
    .pipe(cleanCSS({ format: format ? false : 'beautify' }))
    // .pipe(
    //     cssnano({
    //         zindex: false,
    //         autoprefixer: false,
    //         discardComments: { removeAll: true },
    //     })
    // )
    .pipe(rename({ extname: '.wxss' }))
    .pipe(gulp.dest(paths.dest))
)

/**
 * Build scripts
 */
export const scripts = (paths, base) => () => (
    gulp.src(paths.src, { base })
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest))
)

/**
 * Copy files
 */
export const copy = (paths, base) => () => (
    gulp
    .src(paths.src, { base })
    .pipe(gulp.dest(paths.dest))
)
