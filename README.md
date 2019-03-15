# @eclass/semantic-release-now

[![npm](https://img.shields.io/npm/v/@eclass/semantic-release-now.svg)](https://www.npmjs.com/package/@eclass/semantic-release-now)
[![build](https://img.shields.io/travis/eclass/semantic-release-now.svg)](https://travis-ci.org/eclass/semantic-release-now)
[![downloads](https://img.shields.io/npm/dt/@eclass/semantic-release-now.svg)](https://www.npmjs.com/package/@eclass/semantic-release-now)
[![dependencies](https://img.shields.io/david/eclass/semantic-release-now.svg)](https://david-dm.org/eclass/semantic-release-now)
[![devDependency Status](https://img.shields.io/david/dev/eclass/semantic-release-now.svg)](https://david-dm.org/eclass/semantic-release-now#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/github/eclass/semantic-release-now/badge.svg?branch=master)](https://coveralls.io/github/eclass/semantic-release-now?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/8be6086c58a332d1aee2/maintainability)](https://codeclimate.com/github/eclass/semantic-release-now/maintainability)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> [semantic-release](https://github.com/semantic-release/semantic-release) plugin to deploy app with [now.sh](https://now.sh)

| Step               | Description                                                  |
|--------------------|--------------------------------------------------------------|
| `verifyConditions` | Verify the presence of the `NOW_TOKEN` environment variable. |
| `publish`          | Upload assets to now.sh.                                     |

## Install

```bash
npm i -D @eclass/semantic-release-now
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/caribou/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/gitlab",
    "@eclass/semantic-release-now"
  ]
}
```

## Configuration

### Now authentication

The now authentication configuration is **required** and can be set via [environment variables](#environment-variables).

### Environment variables

| Variable    | Description                                                                             |
| ----------- | --------------------------------------------------------------------------------------- |
| `NOW_TOKEN` | Now token created via [now token](https://zeit.co/account/tokens) |

### Examples

```json
{
  "plugins": [
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/gitlab",
    "@eclass/semantic-release-now"
  ]
}
```

```json
{
  "version": 2,
  "name": "my-awesome-project",
  "builds": [
    {
      "src": "build/**/*",
      "use": "@now/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "headers": {
        "cache-control": "s-maxage=0"
      },
      "dest": "build/index.html"
    }
  ],
  "alias": ["my-awesome-project.now.sh"]
}
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
