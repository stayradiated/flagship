import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getAuthenticator } from '~/lib/auth.server'
import { LoginPage } from '~/components/page/login'
import { createRunnBackend } from '~/lib/runn.server'
import { getSession } from '~/lib/session.server'

type LoaderData = {
  error?: {
    message: string
  }
}

const meta: V2_MetaFunction<LoaderData> = () => {
  return [
    { title: `Sign In • Flagship` },
    { name: 'description', content: 'Manage Feature Flags' },
  ]
}

const loader: LoaderFunction = async ({ request }) => {
  const backend = createRunnBackend()
  const authenticator = getAuthenticator(backend)

  await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  })

  const session = await getSession(request.headers.get('cookie'))
  const error = session.get(authenticator.sessionErrorKey)

  return json<LoaderData>({ error })
}

const Route = () => {
  const { error } = useLoaderData<LoaderData>()

  return <LoginPage error={error} />
}

export { meta, loader }
export default Route
