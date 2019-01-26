module.exports = value => {
  if (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  ) {
    return true;
  }
  return false;
};
