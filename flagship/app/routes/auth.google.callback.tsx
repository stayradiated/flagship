import type { LoaderFunction } from '@remix-run/node'
import { getAuthenticator } from '~/lib/auth.server'
import { createBackend } from '~/lib/backend.server'

const loader: LoaderFunction = ({ request }) => {
  const backend = createBackend()
  const authenticator = getAuthenticator(backend)

  return authenticator.authenticate('google', request, {
    successRedirect: '/',
    failureRedirect: '/login',
  })
}

export { loader }
