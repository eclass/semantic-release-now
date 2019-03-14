'use strict'

const { describe, it, before } = require('mocha')
const { expect } = require('chai')
const { writeFile } = require('fs-extra')
const path = require('path')
const tempy = require('tempy')
const verify = require('../src/verify')

describe('Verify', () => {
  let cwd

  before(async () => {
    cwd = tempy.directory()
  })

  it('Return SemanticReleaseError if NOW_TOKEN environment variable is not defined', async () => {
    try {
      await verify({}, { cwd })
    } catch (err) {
      expect(err.name).to.equal('SemanticReleaseError')
      expect(err.code).to.equal('ENONOWTOKEN')
    }
  })

  it('Return SemanticReleaseError if now.json not exist', async () => {
    try {
      process.env.NOW_TOKEN = 'my-token'
      await verify({}, { cwd })
    } catch (err) {
      expect(err.name).to.equal('SemanticReleaseError')
      expect(err.code).to.equal('ENONOW')
    }
  })

  it('Verify alias from NOW_TOKEN environmen variable', async () => {
    await writeFile(path.resolve(cwd, 'now.json'), '{}')
    expect(await verify({}, { cwd })).to.be.a('undefined')
  })
})
