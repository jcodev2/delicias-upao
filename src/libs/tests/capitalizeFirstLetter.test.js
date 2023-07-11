import { describe, expect, test } from 'vitest'
import { capitalizeFirstLetter } from '../helpers.js'

describe('capitalizeFirstLetter', () => {
  test('capitalizes the first letter of a word', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello')
  })

  test('does not modify an already capitalized word', () => {
    expect(capitalizeFirstLetter('World')).toBe('World')
  })

  test('returns an empty string if given an empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('')
  })

  test('returns the same string if given a single-letter string', () => {
    expect(capitalizeFirstLetter('a')).toBe('A')
  })

  test('handles words with multiple capital letters correctly', () => {
    expect(capitalizeFirstLetter('USA')).toBe('USA')
    expect(capitalizeFirstLetter('uSA')).toBe('USA')
  })

  test('handles words with non-letter characters in the middle correctly', () => {
    expect(capitalizeFirstLetter('hello-world')).toBe('Hello-world')
  })

  test('handles words with non-letter characters at the end correctly', () => {
    expect(capitalizeFirstLetter('hello!')).toBe('Hello!')
  })

  test('handles words with whitespace characters at the beginning correctly', () => {
    expect(capitalizeFirstLetter('  hello')).toBe('  Hello')
  })

  test('handles words with whitespace characters in the middle correctly', () => {
    expect(capitalizeFirstLetter('hel lo')).toBe('Hel lo')
  })

  test('handles words with whitespace characters at the end correctly', () => {
    expect(capitalizeFirstLetter('hello  ')).toBe('Hello  ')
  })
})
