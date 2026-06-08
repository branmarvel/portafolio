import { describe, it, expect } from 'vitest';
import { getReducedMotionTransition } from './motion';

describe('getReducedMotionTransition', () => {
  it('returns a duration of 0.01 when prefersReducedMotion is true', () => {
    const defaultTransition = { duration: 1, type: 'spring' };
    const result = getReducedMotionTransition(true, defaultTransition);

    expect(result).toEqual({ duration: 0.01 });
  });

  it('returns the default transition when prefersReducedMotion is false', () => {
    const defaultTransition = { duration: 1, type: 'spring' };
    const result = getReducedMotionTransition(false, defaultTransition);

    expect(result).toBe(defaultTransition);
    expect(result).toEqual({ duration: 1, type: 'spring' });
  });

  it('handles null or undefined default transition when prefersReducedMotion is false', () => {
    expect(getReducedMotionTransition(false, null)).toBeNull();
    expect(getReducedMotionTransition(false, undefined)).toBeUndefined();
  });
});
