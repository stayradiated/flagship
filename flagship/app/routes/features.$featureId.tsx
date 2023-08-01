import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { createRunnBackend } from '~/lib/runn.server'
import type { Feature, AccountList, User } from '~/lib/types'
import { FeaturePage } from '~/components/page/feature'
import { getAuthenticator } from '~/lib/auth.server'

type LoaderData = {
  feature: Feature
  accountList: AccountList
  user: User
}

const meta: V2_MetaFunction<LoaderData> = ({ data }) => {
  const { feature } = data
  return [
    { title: `${feature.name} • Flagship` },
    { name: 'description', content: 'Manage Feature Flags' },
  ]
}

const $LoaderParameters = z.object({
  featureId: z.string(),
})

const loader: LoaderFunction = async ({ request, params }) => {
  const backend = createRunnBackend()
  const authenticator = getAuthenticator(backend)

  const user = await authenticator.authenticate('google', request, {
    failureRedirect: '/login',
  })

  const { featureId } = $LoaderParameters.parse(params)

  const [feature, accountList] = await Promise.all([
    backend.getFeature({ id: featureId }),
    backend.getAccountListForFeature({
      featureId,
      enabled: true,
      take: 30,
      skip: 0,
    }),
  ])

  return json<LoaderData>({ feature, accountList, user })
}

const Route = () => {
  const { feature, accountList, user } = useLoaderData<LoaderData>()

  return <FeaturePage user={user} feature={feature} accountList={accountList} />
}

export { meta, loader }
export default Route
