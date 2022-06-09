# youtrack-prepare-commit-msg
[![Downloads](https://img.shields.io/npm/dm/youtrack-prepare-commit-msg)](https://www.npmjs.com/package/youtrack-prepare-commit-msg)
[![MIT license](https://img.shields.io/npm/l/youtrack-prepare-commit-msg)](http://opensource.org/licenses/MIT)

The husky command to add YOUTRACK ticket ID into the commit message if it is missed.

The YOUTRACK ticket ID is taken from a git branch name.

## Why?

Installing Youtrack prepare commit msg hook into your project will mean everyone contributing code to your project will automatically tag each commit with
it's associated issue key based off the branch name.

So if your branch name is `feature/TEST-123-new-feature`, then when you commit with a message `"initial commit"` it will automatically become `"TEST-123: initial commit"`.

Why would you want this? Well, Youtrack has many hidden goodies, and this is one of them! If you include an issue key in your commit messages AND you have your deployment pipeline connected to Youtrack this will unlock many bonus features, such as the Deployments view, Cycle time report, Deployment frequency report and I've heard many more features are coming soon!

## Installation

Install the package using NPM

```bash
npm install husky youtrack-prepare-commit-msg --save-dev && npx husky install
```

For Husky 5:

Execute command

```shell
npx husky add .husky/prepare-commit-msg 'npx youtrack-prepare-commit-msg $1'
```

For Husky 2-4:

Inside your package.json add a standard husky npm script for the git hook

```json
{
  "husky": {
    "hooks": {
      "prepare-commit-msg": "youtrack-prepare-commit-msg"
    }
  }
}
```

## Configuration

Starting with v1.3 you can now use different ways of configuring it:

* `youtrack-prepare-commit-msg` object in your `package.json`
* `.youtrackpreparecommitmsgrc` file in JSON or YML format
* `youtrack-prepare-commit-msg.config.js` file in JS format

See [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) for more details on what formats are supported.

#### `package.json` example:

```json
{
  "youtrack-prepare-commit-msg": {
    "messagePattern": "[$J]\n$M",
    "youtrackTicketPattern": "([A-Z]+-\\d+)",
    "commentChar": "#",
    "isConventionalCommit": false,
    "allowEmptyCommitMessage": false,
    "gitRoot": ""
  }
}
```

#### Supported message pattern

`youtrack-prepare-commit-msg` supports special message pattern to configure where YOUTRACK ticket number will be inserted.
* Symbols `$J` will be replaced on YOUTRACK ticket number
* Symbols `$M` will be replaced on commit message.

Pattern `[$J]\n$M` is currently supported by default.

```json
{
  "youtrack-prepare-commit-msg": {
    "messagePattern": "[$J]\n$M"
  }
}
```

##### Examples

* `[$J] $M`
* `[$J]-$M`
* `$J $M`

**NOTE:** the supplied commit message will be cleaned up by `strip` mode.

#### Supported YOUTRACK ticket pattern

`youtrack-prepare-commit-msg` allows using custom regexp string pattern to search YOUTRACK ticket number.

Pattern `([A-Z]+-\\d+)` is currently supported by default.

**NOTE:** to search YOUTRACK ticket pattern flag `i` is used: `new RegExp(pattern, i')`

```json
{
  "youtrack-prepare-commit-msg": {
    "youtrackTicketPattern": "([A-Z]+-\\d+)"
  }
}
```

#### Git comment char

Git uses `#` by default to comment lines in the commit message. If default char was changed `youtrack-prepare-commit-msg` can allow set it.

```json
{
  "youtrack-prepare-commit-msg": {
    "commentChar": "#"
  }
}
```

#### Allow empty commit message

The commit message might be empty after cleanup or using `-m ""`, `youtrack-prepare-commit-msg` might insert the YOUTRACK ticket number anyway if this flag is set.

```json
{
  "youtrack-prepare-commit-msg": {
    "allowEmptyCommitMessage": true
  }
}
```

#### Git root

The git root folder might be set. It is either absolute path or relative path which will be resolved from `cwd`

```json
{
  "youtrack-prepare-commit-msg": {
    "gitRoot": "./../../"
  }
}
```

The package will search commit message so:
```javascript
const pathToGit = path.resolve(cwd, './../../');
const pathToCommitMessage = path.join(pathToGit, '.git', 'COMMIT_EDITMSG');
```

#### Conventional commit

`youtrack-prepare-commit-msg` supports [conventional commit](https://www.conventionalcommits.org). To insert YOUTRACK
ticket number to the description set the following setting:

```json
{
  "youtrack-prepare-commit-msg": {
    "isConventionalCommit": true
  }
}
```

**NOTE:** For description will be applied `messagePattern`

##### Examples

If the configuration is:

```json
{
  "youtrack-prepare-commit-msg": {
    "messagePattern": "[$J] $M",
    "isConventionalCommit": true
  }
}
```

and commit message is `fix(test)!: important changes` then at result will be `fix(test)!: [YOUTRACK-1234] important changes`

## TODO

- [x] Support user patterns
- [x] Support configuration (package.json)
- [x] Lint
- [x] Tests
  - [ ] Test for configuration
- [x] Don't clear commit message

## License

MIT
