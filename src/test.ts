// This file is required by karma.conf.js and loads recursively all the .spec and framework files
// Then we find all the tests.
import { TestBed } from 'angularjs-testbed';

const context = (require as any).context('./', true, /\.spec\.ts$/);
context.keys().map(context);

// source files are needed only for coverage
const source = (require as any).context('./app/', true, /\.ts$/);
source.keys().map(source);

// set strictDi on angular.mock.inject to catch errors if /*@ngInject*/ is missing
beforeEach(() => inject.strictDi(true));
// reset TestingModule after each test
afterEach(() => TestBed.resetTestingModule());
