const isEmpty = require('../util/is-empty');
const { should, expect } = require('./chai-config');

describe('isEmpty', function() {
  const emptyValues = [null, undefined, '', {}, []];
  const nonEmptyValues = ['chicken', { key: 'value' }, [1, 2, 3]];

  emptyValues.forEach(value => {
    it('should return true', function() {
      const result = isEmpty(value);
      result.should.be.true;
    });
  });

  nonEmptyValues.forEach(value => {
    it('should return false', function() {
      const result = isEmpty(value);
      result.should.be.false;
    });
  });
});
