import { test, expect } from 'vitest';
import { getURLQuery, isString } from '../src/utils';

test('getURLQuery(http://localhost:3000?id=chovrio&name=20)', () => {
  expect(getURLQuery('http://localhost:3000?id=chovrio&age=20').age).toBe('20');
});
test('isString', () => {
  expect(isString('NaN')).toBe(true);
  expect(isString(NaN)).toBe(true);
});
