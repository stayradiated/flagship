import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createRunnBackend } from '~/lib/runn.server'
import type { AccountList } from '~/lib/types'
import { AccountListPage } from '~/components/page/account-list'
import { authenticator } from '~/lib/auth.server'

const meta: V2_MetaFunction = () => {
  return [
    { title: 'Accounts • Flagship' },
    { name: 'description', content: 'Manage Feature Flags' },
  ]
}

type LoaderData = {
  accountList: AccountList
  pageIndex: number
  pageSize: number
}

const loader: LoaderFunction = async ({ request }) => {
  await authenticator.authenticate('google', request, {
    failureRedirect: '/login',
  })

  const backend = createRunnBackend()

  const pageIndex = 1
  const pageSize = 10

  const accountList = await backend.getAccountList({
    take: pageSize,
    skip: (pageIndex - 1) * pageSize,
  })

  return json<LoaderData>({ pageIndex, pageSize, accountList })
}

const Route = () => {
  const { accountList, pageIndex, pageSize } = useLoaderData<LoaderData>()

  return (
    <AccountListPage
      pageIndex={pageIndex}
      pageSize={pageSize}
      accountList={accountList}
    />
  )
}

export { meta, loader }
export default Route
