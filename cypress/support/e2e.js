// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';

beforeEach(function () {
  // get groups passed from command
  const cypressGroups = Cypress.env('groups');
  if (!cypressGroups) {
    return;
  }

  const groups = cypressGroups.split(',');

  // exit if no tag or filter defined - we have nothing to do here
  if (!groups) return;

  // get current test's title (which also contains tag/s)
  const testName = Cypress.mocha.getRunner().suite.ctx.currentTest.title;

  // check if current test contains at least 1 targetted tag
  for (let i = 0; i < groups.length; i++) {
    if (testName.includes(groups[i])) return;
  }

  // skip current test run if test doesn't contain targetted tag/s
  this.skip();
});
