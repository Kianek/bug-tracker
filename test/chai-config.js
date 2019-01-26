const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

module.exports = {
  assert: chai.assert,
  expect: chai.expect,
  should: chai.should(),
};
