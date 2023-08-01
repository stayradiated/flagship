import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { zfd } from 'zod-form-data'
import { z } from 'zod'
import { createRunnBackend } from '~/lib/runn.server'
import type { AccountList, User } from '~/lib/types'
import { AccountListPage } from '~/components/page/account-list'
import { getAuthenticator } from '~/lib/auth.server'

const meta: V2_MetaFunction = () => {
  return [
    { title: 'Accounts • Flagship' },
    { name: 'description', content: 'Manage Feature Flags' },
  ]
}

type LoaderData = {
  accountList: AccountList
  user: User
  search?: string
}

const $LoaderSearchParameters = zfd.formData({
  search: zfd.text(z.string().optional()),
})

const loader: LoaderFunction = async ({ request }) => {
  const backend = createRunnBackend()
  const authenticator = getAuthenticator(backend)

  const user = await authenticator.authenticate('google', request, {
    failureRedirect: '/login',
  })

  const url = new URL(request.url)
  const { search } = $LoaderSearchParameters.parse(url.searchParams)

  const accountList = await backend.getAccountList({
    search,
    take: 30,
    skip: 0,
  })

  return json<LoaderData>({ accountList, user, search })
}

const Route = () => {
  const { accountList, user, search } = useLoaderData<LoaderData>()

  console.log({ search })

  return (
    <AccountListPage accountList={accountList} user={user} search={search} />
  )
}

export { meta, loader }
export default Route
