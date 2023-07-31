import { useEffect } from 'react'
import { FlagIcon } from '@heroicons/react/24/outline'
import { useStore } from './store.js'
import styles from './index.module.css'
import type { Feature, AccountList, User } from '~/lib/types'
import { Page } from '~/components/page'
import { AccountTable } from '~/components/account-table'
import { Badge } from '~/components/badge'

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
        <h2 className={styles.title}>
          <FlagIcon className={styles.flagIcon} /> {feature.name}
        </h2>

        <div className={styles.badgeRow}>
          <Badge>
            <Badge.Label>ID</Badge.Label>
            <Badge.Value>{feature.id}</Badge.Value>
          </Badge>
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
