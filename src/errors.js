'use strict'

const pkg = require('../package.json')

const [homepage] = pkg.homepage.split('#')
const linkify = file => `${homepage}/blob/master/${file}`

module.exports = {
  ENONOWTOKEN: () => ({
    message: 'No now token specified.',
    details: `An [now token](${linkify(
      'README.md#now-authentication'
    )}) must be created and set in the \`NOW_TOKEN\` environment variable on your CI environment.

Please make sure to create an [now token](https://zeit.co/account/tokens) and to set it in the \`NOW_TOKEN\` environment variable on your CI environment. The token must allow to publish to now.sh.`
  }),
  ENOWDEPLOY: () => ({
    message: 'Error in `now deploy` command.',
    details:
      'Check the [now documentation](https://zeit.co/docs/v2/deployments/basics/).'
  }),
  ENOWALIAS: () => ({
    message: 'Error in `now alias` command.',
    details:
      'Check the [now documentation](https://zeit.co/docs/v2/deployments/basics/).'
  }),
  ENONOW: () => ({
    message: 'Missing `now.json` file.',
    details:
      'A [now.json file](https://zeit.co/docs/v2/deployments/configuration/) at the root of your project is required to deploy app.'
  })
}
