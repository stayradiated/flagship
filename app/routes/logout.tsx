import type { LoaderFunction } from '@remix-run/node'
import { authenticator } from '~/lib/auth.server'

const loader: LoaderFunction = async ({ request }) => {
  await authenticator.logout(request, {
    redirectTo: '/',
  })
}

export { loader }
