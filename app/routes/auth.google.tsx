import { redirect } from '@remix-run/node'
import type {
  ActionArgs,
  LoaderFunction,
  ActionFunction,
} from '@remix-run/node'
import { authenticator } from '~/lib/auth.server'

const loader: LoaderFunction = () => redirect('/login')

const action: ActionFunction = async ({ request }: ActionArgs) => {
  return authenticator.authenticate('google', request)
}

export { loader, action }
