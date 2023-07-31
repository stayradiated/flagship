import { useEffect } from 'react'
import { UserIcon } from '@heroicons/react/24/solid'
import styles from './index.module.css'
import { useStore } from './store.js'
import type { Account, FeatureList, User } from '~/lib/types'
import { Page } from '~/components/page'
import { FeatureTable } from '~/components/feature-table'
import { Badge } from '~/components/badge'

type AccountPageProps = {
  user: User
  account: Account
  featureList: FeatureList
}

const AccountPage = (props: AccountPageProps) => {
  const { user, account, featureList } = props

  const store = useStore((state) => ({
    init: state.init,
    valueList: state.valueList,
    total: state.total,
    isLoaded: state.isLoaded,
    loadRange: state.loadRange,
    toggleFeature: state.toggleFeature,
  }))

  useEffect(() => {
    store.init(featureList, account.id)
  }, [])

  return (
    <>
      <Page user={user}>
        <section className={styles.header}>
          <h1 className={styles.title}>
            <UserIcon className={styles.accountIcon} /> {account.name}
          </h1>
          <div className={styles.badgeRow}>
            <Badge>
              <Badge.Label>ID</Badge.Label>
              <Badge.Value>{account.id}</Badge.Value>
            </Badge>
            {account.labelList.map((label, index) => (
              <Badge key={index}>
                <Badge.Label>{label.name}</Badge.Label>
                <Badge.Value>{label.value}</Badge.Value>
              </Badge>
            ))}
          </div>
        </section>

        <h2 className={styles.subtitle}>Features</h2>

        <FeatureTable
          rows={store.valueList}
          total={store.total}
          isLoaded={store.isLoaded}
          loadRange={store.loadRange}
          onToggleFeature={store.toggleFeature}
        />
      </Page>
    </>
  )
}

export { AccountPage }
