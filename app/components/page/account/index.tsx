import { useEffect } from 'react'
import styles from './index.module.css'
import { useStore } from './store.js'
import type { Account, FeatureList, User } from '~/lib/types'
import { Page } from '~/components/page'
import { FeatureTable } from '~/components/feature-table'

type AccountPageProps = {
  user: User
  account: Account
  featureList: FeatureList
}

const AccountPage = (props: AccountPageProps) => {
  const { user, account, featureList } = props

  const store = useStore()

  useEffect(() => {
    store.init(featureList, account.id)
  }, [])

  return (
    <>
      <Page user={user}>
        <section className={styles.header}>
          <h1>👤 {account.name}</h1>
          <code>{account.id}</code>
          {account.labelList.map((label, index) => (
            <span key={index} className={styles.label}>
              {label.name}: {label.value}
            </span>
          ))}
        </section>

        <h2>Features</h2>

        <FeatureTable
          rows={store.valueList}
          total={store.total}
          isLoaded={store.isLoaded}
          loadRange={store.loadRange}
        />
      </Page>
    </>
  )
}

export { AccountPage }
