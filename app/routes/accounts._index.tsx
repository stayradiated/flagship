import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createRunnBackend } from '~/lib/runn.server'
import type { AccountList, User } from '~/lib/types'
import { AccountListPage } from '~/components/page/account-list'
import { authenticator } from '~/lib/auth.server'
import { defaultPageIndex, defaultPageSize } from '~/config'

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
  user: User
}

const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.authenticate('google', request, {
    failureRedirect: '/login',
  })

  const backend = createRunnBackend()

  const pageIndex = defaultPageIndex
  const pageSize = defaultPageSize

  const accountList = await backend.getAccountList({
    take: pageSize,
    skip: (pageIndex - 1) * pageSize,
  })

  return json<LoaderData>({ pageIndex, pageSize, accountList, user })
}

const Route = () => {
  const { accountList, pageIndex, pageSize, user } = useLoaderData<LoaderData>()

  return (
    <AccountListPage
      pageIndex={pageIndex}
      pageSize={pageSize}
      accountList={accountList}
      user={user}
    />
  )
}

export { meta, loader }
export default Route
