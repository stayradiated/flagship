import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { createRunnBackend } from '~/lib/runn.server'
import type { Account, FeatureList, User } from '~/lib/types'
import { AccountPage } from '~/components/page/account'
import { authenticator } from '~/lib/auth.server'
import { defaultPageIndex, defaultPageSize } from '~/config'

type LoaderData = {
  user: User
  account: Account
  featureList: FeatureList
  pageIndex: number
  pageSize: number
}

const meta: V2_MetaFunction<LoaderData> = ({ data }) => {
  const { account } = data
  return [
    { title: `${account.name} • Flagship` },
    { name: 'description', content: 'Manage Feature Flags' },
  ]
}

const $LoaderParameters = z.object({
  accountId: z.string(),
})

const loader: LoaderFunction = async ({ request, params }) => {
  const user = await authenticator.authenticate('google', request, {
    failureRedirect: '/login',
  })

  const { accountId } = $LoaderParameters.parse(params)

  const backend = createRunnBackend()

  const pageIndex = defaultPageIndex
  const pageSize = defaultPageSize

  const [account, featureList] = await Promise.all([
    backend.getAccount({ id: accountId }),
    backend.getFeatureListForAccount({
      accountId,
      take: pageSize,
      skip: (pageIndex - 1) * pageSize,
    }),
  ])

  return json<LoaderData>({ account, featureList, pageIndex, pageSize, user })
}

const Route = () => {
  const { user, account, featureList, pageIndex, pageSize } =
    useLoaderData<LoaderData>()

  return (
    <AccountPage
      account={account}
      featureList={featureList}
      pageIndex={pageIndex}
      pageSize={pageSize}
      user={user}
    />
  )
}

export { meta, loader }
export default Route
