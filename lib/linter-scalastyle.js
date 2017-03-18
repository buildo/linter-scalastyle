'use babel'

import { CompositeDisposable } from 'atom';

module.exports = {
  config: {
    scalastyleExecutablePath: {
      type: 'string',
      default: 'scalastyle',
      order: 1
    },
    scalastyleConfigPath: {
      type: 'string',
      default: 'scalastyle-config.xml',
      order: 2
    },
    sourceDir: {
      type: 'string',
      default: 'src/main',
      order: 3
    },
    scalastyleOptions: {
      type: 'string',
      default: '',
      order: 4
    }
  },

  activate() {
    require('atom-package-deps').install();

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.config.observe('linter-scalastyle.scalastyleExecutablePath',
        scalastyleExecutablePath => this.scalastyleExecutablePath = scalastyleExecutablePath));

    this.subscriptions.add(
      atom.config.observe('linter-scalastyle.scalastyleOptions',
        scalastyleOptions => this.scalastyleOptions = scalastyleOptions));

    this.subscriptions.add(
      atom.config.observe('linter-scalastyle.sourceDir',
        sourceDir => this.sourceDir = sourceDir));

    this.subscriptions.add(
      atom.config.observe('linter-scalastyle.scalastyleConfigPath',
        scalastyleConfigPath => this.scalastyleConfigPath = scalastyleConfigPath));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  provideLinter() {
    const helpers = require('atom-linter');
    const path = require('path');
    const fs = require('fs');

    const messageLineAndColumnRegex = 'message=(?<message>.*) line=(?<line>\\d+) column=(?<column>\\d+)';
    const messageAndLineRegex = 'message=(?<message>.*) line=(?<line>\\d+)';
    const onlyMessageRegex = 'message=(?<message>.*)';
    const regex = `(?<type>error|warning) file=(?<file>\\S+) (?:(?:${messageLineAndColumnRegex})|(?:${messageAndLineRegex})|(?:${onlyMessageRegex}))`;

    return {
      name: 'scalastyle',
      grammarScopes: ['source.scala'],
      scope: 'project',
      lintOnFly: true,
      lint: textEditor => {
        const filePath = textEditor.getPath();
        const relativizedPath = atom.project.relativizePath(filePath);
        const projectPath = relativizedPath[0] || file.substring(0, filePath.lastIndexOf('/'));

        const configFile = path.join(projectPath, this.scalastyleConfigPath);
        try {
          fs.accessSync(configFile);
        } catch (e) {
          console.error(`No config file found at path ${configFile}`);
          return;
        }
        const sourceDir = path.join(projectPath, this.sourceDir);
        const args = ['-c', configFile].concat(this.scalastyleOptions).concat(sourceDir);

        return helpers.exec(this.scalastyleExecutablePath, args, { stream: 'stdout', ignoreExitCode: true })
          .then(output => helpers.parse(output, regex));
      }
    }
  }
}
