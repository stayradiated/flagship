import { redirect } from '@remix-run/node'
import type {
  ActionArgs,
  LoaderFunction,
  ActionFunction,
} from '@remix-run/node'
import { getAuthenticator } from '~/lib/auth.server'
import { createRunnBackend } from '~/lib/runn.server'

const loader: LoaderFunction = () => redirect('/login')

const action: ActionFunction = async ({ request }: ActionArgs) => {
  const backend = createRunnBackend()
  const authenticator = getAuthenticator(backend)

  return authenticator.authenticate('google', request)
}

export { loader, action }
