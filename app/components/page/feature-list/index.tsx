import { useEffect } from 'react'
import styles from './index.module.css'
import { useStore } from './store.js'
import type { FeatureList, User } from '~/lib/types'
import { Page } from '~/components/page'
import { FeatureTable } from '~/components/feature-table'

type FeatureListPageProps = {
  featureList: FeatureList
  user: User
}

const FeatureListPage = (props: FeatureListPageProps) => {
  const { user, featureList } = props

  const store = useStore()

  useEffect(() => {
    store.init(featureList)
  }, [])

  console.log(store)

  return (
    <>
      <Page user={user}>
        <h2 className={styles.title}>Feature List</h2>
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

export { FeatureListPage }
