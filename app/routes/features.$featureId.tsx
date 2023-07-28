import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { createRunnBackend } from '~/lib/runn.server'
import type { Feature, AccountList, User } from '~/lib/types'
import { FeaturePage } from '~/components/page/feature'
import { authenticator } from '~/lib/auth.server'
import { defaultPageIndex, defaultPageSize } from '~/config'

type LoaderData = {
  feature: Feature
  accountList: AccountList
  user: User
  pageIndex: number
  pageSize: number
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
  const user = await authenticator.authenticate('google', request, {
    failureRedirect: '/login',
  })

  const { featureId } = $LoaderParameters.parse(params)

  const pageIndex = defaultPageIndex
  const pageSize = defaultPageSize

  const backend = createRunnBackend()

  const [feature, accountList] = await Promise.all([
    backend.getFeature({ id: featureId }),
    backend.getAccountListForFeature({
      featureId,
      enabled: true,
      take: pageSize,
      skip: (pageIndex - 1) * pageSize,
    }),
  ])

  return json<LoaderData>({ feature, accountList, user, pageSize, pageIndex })
}

const Route = () => {
  const { feature, accountList, user, pageSize, pageIndex } =
    useLoaderData<LoaderData>()

  return (
    <FeaturePage
      user={user}
      feature={feature}
      accountList={accountList}
      pageIndex={pageIndex}
      pageSize={pageSize}
    />
  )
}

export { meta, loader }
export default Route
