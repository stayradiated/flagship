import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { createRunnBackend } from '~/lib/runn.server'
import type { Account, FeatureList } from '~/lib/types'
import { FeatureTable } from '~/components/feature-table'

const meta: V2_MetaFunction = () => {
  return [
    { title: 'Flagship' },
    { name: 'description', content: 'Manage Feature Flags' },
  ]
}

type LoaderData = {
  account: Account
  featureList: FeatureList
}

const $LoaderParameters = z.object({
  accountId: z.string(),
})

const loader: LoaderFunction = async ({ params }) => {
  const { accountId } = $LoaderParameters.parse(params)

  const backend = createRunnBackend()

  const [account, featureList, featureAccountList] = await Promise.all([
    backend.getAccount({ id: accountId }),
    backend.getFeatureList({ take: 10, cursor: undefined }),
    backend.getFeatureAccountList({ accountId, take: 10, cursor: undefined }),
  ])

  for (const featureAccount of featureAccountList.items) {
    const feature = featureList.items.find(
      (feature) => feature.id === featureAccount.featureId,
    )
    if (feature) {
      feature.enabled = featureAccount.enabled
    }
  }

  return json<LoaderData>({ account, featureList })
}

const Route = () => {
  const { account, featureList } = useLoaderData<LoaderData>()

  return (
    <main>
      <h1>{account.name}</h1>
      <FeatureTable featureList={featureList} />
    </main>
  )
}

export { meta, loader }
export default Route
