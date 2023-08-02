import type { LoaderFunction } from '@remix-run/node'
import { getAuthenticator } from '~/lib/auth.server'
import { createBackend } from '~/lib/backend.server'

const loader: LoaderFunction = async ({ request }) => {
  const backend = createBackend()
  const authenticator = getAuthenticator(backend)

  await authenticator.logout(request, {
    redirectTo: '/',
  })
}

export { loader }
