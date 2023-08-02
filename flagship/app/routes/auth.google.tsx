import {
  redirect,
  type ActionArgs,
  type LoaderFunction,
  type ActionFunction,
} from '@remix-run/node'
import { getAuthenticator } from '~/lib/auth.server'
import { createBackend } from '~/lib/backend.server'

const loader: LoaderFunction = () => redirect('/login')

const action: ActionFunction = async ({ request }: ActionArgs) => {
  const backend = createBackend()
  const authenticator = getAuthenticator(backend)

  return authenticator.authenticate('google', request)
}

export { loader, action }
