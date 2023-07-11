import { describe, expect, test } from 'vitest'
import { addZeroToNumber } from '../helpers'

describe('addZeroToNumber', () => {
  test('throws an error when given a negative number', () => {
    expect(() => addZeroToNumber(-1)).toThrow(
      'Input must be a non-negative number'
    )
  })

  test('adds a zero to a single-digit number', () => {
    expect(addZeroToNumber(4)).toBe('04')
  })

  test('does not modify a double-digit number', () => {
    expect(addZeroToNumber(12)).toBe('12')
  })

  test('handles a number of 0 correctly', () => {
    expect(addZeroToNumber(0)).toBe('00')
  })
})
