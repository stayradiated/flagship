import type { LoaderFunction } from '@remix-run/node'
import { getAuthenticator } from '~/lib/auth.server'
import { createRunnBackend } from '~/lib/runn.server'

const loader: LoaderFunction = async ({ request }) => {
  const backend = createRunnBackend()
  const authenticator = getAuthenticator(backend)

  await authenticator.logout(request, {
    redirectTo: '/',
  })
}

export { loader }
