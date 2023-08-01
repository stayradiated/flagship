import type { AuthenticateUserFn } from '@stayradiated/flagship-core'

const authenticateUser: AuthenticateUserFn = async (user) => {
  const isAuthenticated = user.email.endsWith('@runn.io')
  if (isAuthenticated) {
    return {
      isAuthenticated: true,
      user,
    }
  }

  return {
    isAuthenticated: false,
    errorMessage: 'Invalid email address, must be @runn.io',
  }
}

export { authenticateUser }
