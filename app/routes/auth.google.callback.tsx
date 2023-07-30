import type { LoaderFunction } from '@remix-run/node'
import { getAuthenticator } from '~/lib/auth.server'
import { createRunnBackend } from '~/lib/runn.server'

const loader: LoaderFunction = ({ request }) => {
  const backend = createRunnBackend()
  const authenticator = getAuthenticator(backend)

  return authenticator.authenticate('google', request, {
    successRedirect: '/',
    failureRedirect: '/login',
  })
}

export { loader }
