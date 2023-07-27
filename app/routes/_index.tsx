import type { LoaderFunction } from '@remix-run/node'
import { authenticator } from '~/lib/auth.server'

const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/features',
    failureRedirect: '/login',
  })
  return null
}

export { loader }
