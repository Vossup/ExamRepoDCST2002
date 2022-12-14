import { divide } from '../src/testing';

describe('testing divide function', () => {
  test('divide two numbers != 0', () => {
    divide(10,2).then((result) => {
      expect(result).toBe(5);
    });
  });
});