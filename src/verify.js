'use strict'

const path = require('path')
const { exists } = require('fs-extra')
const getError = require('./get-error')

module.exports = async (_, { cwd }) => {
  if (!process.env.NOW_TOKEN) {
    throw getError('ENONOWTOKEN')
  }
  if (!await exists(path.resolve(cwd, 'now.json'))) {
    throw getError('ENONOW')
  }
}
