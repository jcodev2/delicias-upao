import { describe, expect, test } from 'vitest'
import { addZeroToRating } from '../helpers'

describe('addZeroToRating', () => {
  test('adds a zero to a whole number rating', () => {
    expect(addZeroToRating(4)).toBe('4.0')
  })

  test('does not modify a rating with a decimal already', () => {
    expect(addZeroToRating(3.5)).toBe('3.5')
  })

  test('handles a rating of 0 correctly', () => {
    expect(addZeroToRating(0)).toBe('0.0')
  })

  test('handles a negative rating correctly', () => {
    expect(addZeroToRating(-2.5)).toBe('-2.5')
  })
})
