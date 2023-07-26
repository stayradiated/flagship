import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createRunnBackend } from '~/lib/runn.server'
import type { AccountList } from '~/lib/types'
import { AccountTable } from '~/components/account-table'

const meta: V2_MetaFunction = () => {
  return [
    { title: 'Flagship' },
    { name: 'description', content: 'Manage Feature Flags' },
  ]
}

type LoaderData = {
  accountList: AccountList
}

const loader: LoaderFunction = async () => {
  const backend = createRunnBackend()

  const accountList = await backend.getAccountList({
    take: 10,
    cursor: undefined,
  })

  return json<LoaderData>({ accountList })
}

const Route = () => {
  const { accountList } = useLoaderData<LoaderData>()

  return <AccountTable accountList={accountList} />
}

export { meta, loader }
export default Route
