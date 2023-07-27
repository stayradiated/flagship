import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { createRunnBackend } from '~/lib/runn.server'
import type { Feature, AccountList } from '~/lib/types'
import { FeaturePage } from '~/components/page/feature'
import { authenticator } from '~/lib/auth.server'

type LoaderData = {
  feature: Feature
  accountList: AccountList
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
  await authenticator.authenticate('google', request, {
    failureRedirect: '/login',
  })

  const { featureId } = $LoaderParameters.parse(params)

  const backend = createRunnBackend()

  const [feature, accountList] = await Promise.all([
    backend.getFeature({ id: featureId }),
    backend.getAccountListForFeature({
      featureId,
      enabled: true,
      take: 10,
      skip: 0,
    }),
  ])

  return json<LoaderData>({ feature, accountList })
}

const Route = () => {
  const { feature, accountList } = useLoaderData<LoaderData>()

  return (
    <FeaturePage
      feature={feature}
      accountList={accountList}
      pageIndex={1}
      pageSize={10}
    />
  )
}

export { meta, loader }
export default Route
