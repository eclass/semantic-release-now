'use strict'

const execa = require('execa')
const getError = require('./get-error')

module.exports = async (_, { cwd, env, stdout, stderr, logger }) => {
  try {
    logger.log('Deploy app to now.sh')
    const deployResult = execa(
      'now',
      ['deploy', '--prod', '--token', process.env.NOW_TOKEN],
      { cwd, env }
    )
    deployResult.stdout.pipe(
      stdout,
      { end: false }
    )
    deployResult.stderr.pipe(
      stderr,
      { end: false }
    )
    await deployResult
  } catch (err) {
    throw getError('ENOWDEPLOY')
  }
}
