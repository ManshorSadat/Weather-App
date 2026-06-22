const { getDateTime } = require('../script.js'); // Adjust the path as necessary

test('getDateTime returns a string', () => {
  expect(typeof getDateTime()).toBe('string');
});

// Add more tests to validate the returned format, the values, etc.
