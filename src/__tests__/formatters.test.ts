import { describe, it, expect } from 'vitest';
import { formatCurrency, formatFileSize } from '../formatters';

describe('formatCurrency', () => {
  it('formats a positive number as USD', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });
});

describe('formatFileSize', () => {
  it('formats bytes to KB', () => {
    expect(formatFileSize(1536)).toBe('1.5 KB');
  });

  it('throws for negative bytes', () => {
    expect(() => formatFileSize(-1)).toThrow('Bytes must be non-negative');
  });
});
