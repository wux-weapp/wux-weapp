import gulp from 'gulp'
import * as utils from './build-utils'
import getOutput from './get-output'

import example, { watch } from './build-example'
import core from './build-core'
import es from './build-es'
import lib from './build-lib'

export default gulp.series(example, watch)
export const buildExample = example
export const buildCore = core
export const buildEs = es
export const buildLib = lib
export const build = gulp.series(utils.clean(getOutput()), core, gulp.parallel(es, lib))
