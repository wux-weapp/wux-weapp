const pkg = require('../package.json')

const version = process.env.VERSION || pkg.version

const date = {
    day: new Date().getDate() < 9 ? `0${new Date().getDate()}` : new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
}

const banner = `${`
/**
 * Wux Weapp ${version}
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * Copyright 2017-${date.year} ${pkg.author}
 *
 * Released under the ${pkg.license} License
 *
 * Released on: ${date.year}-${date.month}-${date.day}
 */
`.trim()}\n`

module.exports = banner
