import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createRunnBackend } from '~/lib/runn.server'
import type { FeatureList, User } from '~/lib/types'
import { FeatureListPage } from '~/components/page/feature-list'
import { getAuthenticator } from '~/lib/auth.server'

const meta: V2_MetaFunction = () => {
  return [
    { title: 'Features • Flagship' },
    { name: 'description', content: 'Manage Feature Flags' },
  ]
}

type LoaderData = {
  featureList: FeatureList
  user: User
}

const loader: LoaderFunction = async ({ request }) => {
  const backend = createRunnBackend()
  const authenticator = getAuthenticator(backend)

  const user = await authenticator.authenticate('google', request, {
    failureRedirect: '/login',
  })

  const featureList = await backend.getFeatureList({
    take: 30,
    skip: 0,
  })

  return json<LoaderData>({ featureList, user })
}

const Route = () => {
  const { featureList, user } = useLoaderData<LoaderData>()

  return <FeatureListPage featureList={featureList} user={user} />
}

export { meta, loader }
export default Route
