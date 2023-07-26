import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { createRunnBackend } from '~/lib/runn.server'
import type { Feature, AccountList } from '~/lib/types'
import { AccountTable } from '~/components/account-table'

const meta: V2_MetaFunction = () => {
  return [
    { title: 'Flagship' },
    { name: 'description', content: 'Manage Feature Flags' },
  ]
}

type LoaderData = {
  feature: Feature
  accountList: AccountList
}

const $LoaderParameters = z.object({
  featureId: z.string(),
})

const loader: LoaderFunction = async ({ params }) => {
  const { featureId } = $LoaderParameters.parse(params)

  const backend = createRunnBackend()

  const [feature, accountList] = await Promise.all([
    backend.getFeature({ id: featureId }),
    backend.getAccountListForFeature({
      featureId,
      enabled: true,
      take: 10,
      cursor: undefined,
    }),
  ])

  return json<LoaderData>({ feature, accountList })
}

const Route = () => {
  const { feature, accountList } = useLoaderData<LoaderData>()

  return (
    <main>
      <h1>{feature.name}</h1>

      <AccountTable accountList={accountList} />
    </main>
  )
}

export { meta, loader }
export default Route
