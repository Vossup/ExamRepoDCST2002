import { fibonacci } from '../src/testing3';

// Test for the fibonacci function with 100% coverage of lines and branches
// The for loop test is not necessary for 100% coverage, but first intuition was to test it, and still gives 100% and no errors.
describe('testing fibonacci', () => {
  test('n = 0', () => {
    expect(fibonacci(0)).toBe(0);
  });
  test('n = 1', () => {
    expect(fibonacci(1)).toBe(1);
  });
  test('n = 2', () => {
    expect(fibonacci(2)).toBe(1);
  });
  test('n != 1 && n != 0', () => {
    for(let i = 2; i < 10; i++){
      expect(fibonacci(i)).toBe(fibonacci(i - 1) + fibonacci(i - 2));
    }
  });
});

