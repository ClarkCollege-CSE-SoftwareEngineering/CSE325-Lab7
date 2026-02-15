import { describe, it, expect } from 'vitest';
import { isValidEmail, isStrongPassword } from '../validators';

describe('isValidEmail', () => {
  it('accepts a valid email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('rejects email without @', () => {
    expect(isValidEmail('userexample.com')).toBe(false);
  });
});

describe('isStrongPassword', () => {
  it('accepts a strong password', () => {
    expect(isStrongPassword('MyPass123')).toBe(true);
  });
});
