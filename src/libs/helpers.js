const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const addZeroToRating = (rating) => {
  return rating.toString().split('.').length === 1 ? `${rating}.0` : rating
}

const addZeroToNumber = (number) => {
  return number.toString().length === 1 ? `0${number}` : number
}

export { addZeroToRating, capitalizeFirstLetter, addZeroToNumber }
