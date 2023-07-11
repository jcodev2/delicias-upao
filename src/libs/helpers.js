const capitalizeFirstLetter = (string) => {
  if (string.length === 0) {
    return ''
  }

  const firstChar = string.charAt(0)
  const restOfString = string.slice(1)

  if (!/^[a-zA-Z]/.test(firstChar)) {
    return firstChar + capitalizeFirstLetter(restOfString)
  }

  return firstChar.toUpperCase() + restOfString
}

const addZeroToRating = (rating) => {
  const ratingString = rating.toString()
  if (ratingString.indexOf('.') === -1) {
    return ratingString + '.0'
  }
  return ratingString
}

const addZeroToNumber = (number) => {
  if (number < 0) {
    throw new Error('Input must be a non-negative number')
  }
  if (Math.abs(number) < 10) {
    return '0' + Math.abs(number)
  }
  return number.toString()
}

export { addZeroToNumber, addZeroToRating, capitalizeFirstLetter }
