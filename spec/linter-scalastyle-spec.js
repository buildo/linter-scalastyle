'use babel'

// Requires scalastyle to be installed and on the path.

describe('linter-scalastyle', () => {
  const path = require('path');

  const lint = require('../lib/linter-scalastyle')
    .provideLinter()
    .lint;

  const fixturesPath = path.join(__dirname, 'fixtures');

  const lintProject = (project, file) => {
    const projectPath = path.join(fixturesPath, project);
    const targetFile = path.join(projectPath, file);

    atom.project.setPaths([projectPath]);

    return atom.workspace.open(targetFile)
      .then(lint);
  }

  // Setup

  beforeEach(() =>
    waitsForPromise(() =>
      atom.packages.activatePackage('linter-scalastyle')));

  // Spec

  describe('the standard behaviour', () => {

    it('lints a source file with no errors', () => {
      waitsForPromise(() =>
        lintProject('project1', 'src/main/scala/project/Main.scala')
        .then(messages => {
          expect(messages.length).toEqual(0);
        })
      );
    });

    it('lints a source file with an error', () => {
      waitsForPromise(() =>
        lintProject('project2', 'src/main/scala/project/Main.scala')
        .then(messages => {
          expect(messages.length).toEqual(1);
          expect(messages[0].type).toEqual('error');
          expect(messages[0].text)
            .toEqual('Avoid using null');
        })
      );
    });

    it('lints a source file with an error without column', () => {
      waitsForPromise(() =>
        lintProject('project3', 'src/main/scala/project/Main.scala')
        .then(messages => {
          expect(messages.length).toEqual(2);
          expect(messages[0].type).toEqual('error');
          expect(messages[0].text)
            .toEqual('Use correct indentation');
        })
      );
    });

  });
});
