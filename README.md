# linter-scalastyle
A scala linter for [Atom Linter](https://github.com/atom-community/linter) using scalastyle

[![Travis CI Status](https://img.shields.io/travis/buildo/linter-scalastyle/master.svg?style=flat-square&label=os%20x)](https://travis-ci.org/buildo/linter-scalastyle)

## Installation

```
apm install linter-scalastyle
```

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
  'scalastyleOptions': '-Xlint -P:wartremover:traverser:org.brianmckenna.wartremover.warts.Unsafe'

```

## Credits
The work on linter-scalastyle is based on [AtomLinter/linter-scalac](https://github.com/AtomLinter/linter-scalac).
