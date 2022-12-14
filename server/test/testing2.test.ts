import { getAnswer } from '../src/testing2';

describe('testing getAnswer function', () => {
  test('get answer', () => {
    getAnswer().then((result) => {
      expect(result).toEqual(42);
    });
  });
});