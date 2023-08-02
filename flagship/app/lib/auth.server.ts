import { Authenticator, AuthorizationError } from 'remix-auth'
import { GoogleStrategy } from 'remix-auth-google'
import type { FlagshipService, User } from '@stayradiated/flagship-core'
import { getEnv } from './env.server'
import { sessionStorage } from '~/lib/session.server'
// Import { once} from './utils/once'

const env = getEnv()

const getAuthenticator = (backend: FlagshipService) => {
  const googleStrategy = new GoogleStrategy(
    {
      clientID: env.googleClientId,
      clientSecret: env.googleClientSecret,
      callbackURL: `${env.publicUrl}/auth/google/callback`,
    },
    async ({ profile }) => {
      const result = await backend.authenticateUser({
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      })
      if (!result.isAuthenticated) {
        throw new AuthorizationError(result.errorMessage)
      }

      return result.user
    },
  )

  // Create an instance of the authenticator, pass a generic with what
  // strategies will return and will store in the session
  const authenticator = new Authenticator<User>(sessionStorage)

  authenticator.use(googleStrategy)

  return authenticator
}

export { getAuthenticator }
