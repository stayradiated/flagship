import { useEffect } from 'react'
import { useStore } from './store.js'
import styles from './index.module.css'
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
        <h2 className={styles.title}>🏁 {feature.name}</h2>

        <div className={styles.badgeRow}>
          <div className={styles.badge}>
            <span className={styles.label}>ID</span>
            <span className={styles.value}>{feature.id}</span>
          </div>
        </div>

        <p className={styles.description}>{feature.description}</p>

        {store.total === 0 && (
          <p className={styles.noResult}>
            This feature is not enabled for any accounts…
          </p>
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

export { FeaturePage }
