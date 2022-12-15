import { degreesToString } from '../src/testing2';

// Test for the degreesToString function with 100% coverage of lines and branches
describe('testing degreesToString', () => {
  test('negtive  31 or colder', () => {
    expect(degreesToString(-31)).toBe('Få inn katta!');
  });
  test('negative 21', () => {
    expect(degreesToString(-21)).toBe('Kjøle kaaalt');
  });
  test('more than positive 20 but less than 30', () => {
    expect(degreesToString(21)).toBe('Søkke heitt');
  });
  test('more than positive 30', () => {
    expect(degreesToString(31)).toBe('Kokheitt');
  });
  test('no match (julivær)', () => {
    expect(degreesToString(0)).toBe('Julivær');
  });
});

