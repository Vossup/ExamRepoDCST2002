import { absoluteValue } from '../src/testing';

describe('testing divide function', () => {
  test('positive number', () => {
    expect(absoluteValue(10)).toBe(10);
  })
  test('negative number', () => {
    expect(absoluteValue(-10)).toBe(10);
  })
});