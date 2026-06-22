const { celciusToFahrenheit } = require('../script');

describe('Celsius to Fahrenheit conversion', () => {
  test('0°C should be 32°F', () => {
    expect(celciusToFahrenheit(0)).toBe('32.0');
  });

  test('100°C should be 212°F', () => {
    expect(celciusToFahrenheit(100)).toBe('212.0');
  });
});
