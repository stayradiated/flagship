import { Authenticator } from 'remix-auth'
import { GoogleStrategy } from 'remix-auth-google'
import { getEnv } from './env.server'
import { sessionStorage } from '~/lib/session.server'
import { type User } from '~/lib/types'

const env = getEnv()

const googleStrategy = new GoogleStrategy(
  {
    clientID: env.googleClientId,
    clientSecret: env.googleClientSecret,
    callbackURL: `${env.publicUrl}/auth/google/callback`,
  },
  async ({ profile }) => {
    const user: User = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
    }

    return user
  },
)

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
const authenticator = new Authenticator<User>(sessionStorage)

authenticator.use(googleStrategy)

export { authenticator }
