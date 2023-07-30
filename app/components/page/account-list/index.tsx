import { useEffect } from 'react'
import styles from './index.module.css'
import { useStore } from './store.js'
import type { AccountList, User } from '~/lib/types'
import { Page } from '~/components/page'
import { AccountTable } from '~/components/account-table'
import { SearchInput } from '~/components/search-input'

type AccountListPageProps = {
  accountList: AccountList
  user: User
  search?: string
}

const AccountListPage = (props: AccountListPageProps) => {
  const { accountList, user, search = '' } = props

  const store = useStore()

  useEffect(() => {
    store.init(accountList, search)
  }, [])

  return (
    <>
      <Page user={user}>
        <h2 className={styles.title}>Account List</h2>

        <SearchInput
          defaultValue={search}
          onChange={(query) => {
            store.setSearch(query)
          }}
        />

        {store.total === 0 && (
          <p className={styles.noResult}>No accounts found…</p>
        )}

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
