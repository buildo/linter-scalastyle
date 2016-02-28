# linter-scalastyle
A scala linter for [Atom Linter](https://github.com/atom-community/linter) using scalastyle

[![Travis CI Status](https://img.shields.io/travis/buildo/linter-scalastyle/master.svg?style=flat-square&label=os%20x)](https://travis-ci.org/buildo/linter-scalastyle)

## Installation

```
apm install linter-scalastyle
```

## Screenshot

<img width="808" alt="screen shot 2016-02-28 at 12 29 34 am" src="https://cloud.githubusercontent.com/assets/691940/13378562/94525792-de0a-11e5-91f8-e03990c041ba.png">


## Configuration

Here's the default config.
You can tweak it in `config.cson` or via the package manager GUI.

```coffeescript
'linter-scalastyle':

  # The path of the scalastyle executable
  'scalastyleExecutablePath': 'scalastyle'

  # The path of the scalastyle configuration file
  'scalastyleConfig': 'scalastyle-config.xml'

  # The source directory to run scalastyle on
  'sourceDir': 'src/main'

  # If you want to add options to the scalastyle command, this is your chance
  'scalastyleOptions': ''

```

## Credits
The work on linter-scalastyle is based on [AtomLinter/linter-scalac](https://github.com/AtomLinter/linter-scalac).
