const { getIcon } = require('../script.js');

describe('Get icon based on weather condition', () => {
  test('should return sun icon for clear-day', () => {
    expect(getIcon('clear-day')).toBe('icons/sun/26.png');
  });

  test('should return the default icon for an unknown condition', () => {
    expect(getIcon('alien-storm')).toBe('icons/sun/26.png');
  });
});

