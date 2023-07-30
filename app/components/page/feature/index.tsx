import { useEffect } from 'react'
import { useStore } from './store.js'
import type { Feature, AccountList, User } from '~/lib/types'
import { Page } from '~/components/page'
import { AccountTable } from '~/components/account-table'

type FeaturePageProps = {
  user: User
  feature: Feature
  accountList: AccountList
}

const FeaturePage = (props: FeaturePageProps) => {
  const { user, feature, accountList } = props

  const store = useStore()

  useEffect(() => {
    store.init(accountList, feature.id)
  }, [])

  return (
    <>
      <Page user={user}>
        <h2>🚩 {feature.name}</h2>
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

export { FeaturePage }
