'use strict'

const path = require('path')
const execa = require('execa')
const { readJSON } = require('fs-extra')
const getError = require('./get-error')

module.exports = async (_, { cwd, env, stdout, stderr, logger }) => {
  let deployOutput
  const nowJson = await readJSON(path.resolve(cwd, 'now.json'))
  try {
    logger.log('Deploy app to now.sh')
    const deployResult = execa(
      'now',
      ['deploy', '--token', process.env.NOW_TOKEN],
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
    deployOutput = await deployResult
  } catch (err) {
    throw getError('ENOWDEPLOY')
  }

  if (nowJson.alias) {
    try {
      logger.log(`Assigning alias to deployment ${deployOutput.stdout}`)
      const aliasResult = execa(
        'now',
        ['alias', '--token', process.env.NOW_TOKEN],
        { cwd, env }
      )
      aliasResult.stdout.pipe(
        stdout,
        { end: false }
      )
      aliasResult.stderr.pipe(
        stderr,
        { end: false }
      )
      await aliasResult
    } catch (err) {
      throw getError('ENOWALIAS')
    }
  }
}
