const ValidateInput = (email, password, name = '') => {
  const errors = {}
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
  const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+=[\]{}|\\,.?:-]{8,}$/

  if (!email || !password) {
    errors.general = 'Please fill in all fields'
    return errors
  }

  if (name && !nameRegex.test(name)) {
    errors.name = 'Please enter a valid name'
  }

  if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (password.length < 8 || password.length > 32) {
    errors.password = 'Password must be between 8 and 32 characters'
  }

  if (!passwordRegex.test(password)) {
    errors.password =
      'Password must contain at least one uppercase letter, one lowercase letter and one number'
  }

  return errors
}

export default ValidateInput
