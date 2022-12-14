import { rollDice } from '../src/testing3';

describe('testing rollDice function', () => {
  test('roll dice', () => {
    for(let i = 0; i < 50; i++) {
      let result = rollDice();
      expect(result).toMatch(/one|two|three|four|five|six/);
    }
  });
});