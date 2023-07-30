import { useEffect } from 'react'
import { Form } from '@remix-run/react'
import styles from './index.module.css'
import { useStore } from './store.js'
import type { AccountList, User } from '~/lib/types'
import { Page } from '~/components/page'
import { AccountTable } from '~/components/account-table'

type AccountListPageProps = {
  accountList: AccountList
  user: User
  search?: string
}

const AccountListPage = (props: AccountListPageProps) => {
  const { accountList, user, search } = props

  const store = useStore()

  useEffect(() => {
    store.init(accountList)
  }, [])

  return (
    <>
      <Page user={user}>
        <h2 className={styles.title}>Account List</h2>

        <Form method="GET">
          <input type="search" name="search" defaultValue={search} />
          <button>Search</button>
        </Form>

        <AccountTable
          rows={store.valueList}
          total={store.total}
          isLoaded={store.isLoaded}
          loadRange={store.loadRange}
        />
      </Page>
    </>
  )
}

export { AccountListPage }
