import { Authenticator } from 'remix-auth'
import { GoogleStrategy } from 'remix-auth-google'
import { getEnv } from './env.server'
import { sessionStorage } from '~/lib/session.server'

type User = {
  id: string
}

const env = getEnv()

const googleStrategy = new GoogleStrategy(
  {
    clientID: env.googleClientId,
    clientSecret: env.googleClientSecret,
    callbackURL: `${env.publicUrl}/auth/google/callback`,
  },
  async ({ profile }) => {
    const userEmail = profile.emails[0].value

    console.log({ userEmail })

    // Get the user data from your DB or API using the tokens and profile
    return {
      id: userEmail,
    }
  },
)

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
const authenticator = new Authenticator<User>(sessionStorage)

authenticator.use(googleStrategy)

export { authenticator }
