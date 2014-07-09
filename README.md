Chrome App Skeleton with Unit/E2E tests.
========================================

This is a skeleton project for creating Chrome App (Chrome Packged App) with tests.


## Test

### Install protractor

Require [protractor]( https://github.com/angular/protractor ).

```
$ npm install -g protractor
```

### Run tests

```
$ protractor
```

### Test structure

`specs/main_spec.js` is main test script. This is e2e context test and bootstrap of unit tests.

`specs/test.html` and `specs/unit_spec.js` is unit tests in Chrome App context.
`specs/test.html` includes scripts of requrements (In this project, framework of any test is [Jasmine]( http://jasmine.github.io/ )
