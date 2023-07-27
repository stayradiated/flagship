import type { LoaderFunction } from '@remix-run/node'
import { authenticator } from '~/lib/auth.server'
import { LoginPage } from '~/components/page/login'

const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  })

  return null
}

const Route = () => {
  return <LoginPage />
}

export { loader }
export default Route
