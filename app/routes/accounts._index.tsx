import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { zfd } from 'zod-form-data'
import { z } from 'zod'
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
  search?: string
}

const $LoaderSearchParameters = zfd.formData({
  search: zfd.text(z.string().optional()),
})

const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.authenticate('google', request, {
    failureRedirect: '/login',
  })

  const url = new URL(request.url)
  const { search } = $LoaderSearchParameters.parse(url.searchParams)

  const backend = createRunnBackend()

  const pageIndex = defaultPageIndex
  const pageSize = defaultPageSize

  const accountList = await backend.getAccountList({
    search,
    take: pageSize,
    skip: (pageIndex - 1) * pageSize,
  })

  return json<LoaderData>({ pageIndex, pageSize, accountList, user, search })
}

const Route = () => {
  const { accountList, pageIndex, pageSize, user, search } =
    useLoaderData<LoaderData>()

  return (
    <AccountListPage
      pageIndex={pageIndex}
      pageSize={pageSize}
      accountList={accountList}
      user={user}
      search={search}
    />
  )
}

export { meta, loader }
export default Route
