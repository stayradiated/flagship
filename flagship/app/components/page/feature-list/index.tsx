import { useEffect } from 'react'
import styles from './index.module.css'
import { useStore } from './store.js'
import type { FeatureList, User } from '~/lib/types'
import { Page } from '~/components/page'
import { FeatureTable } from '~/components/feature-table'
import { SearchInput } from '~/components/search-input'

type FeatureListPageProps = {
  featureList: FeatureList
  user: User
  search?: string
}

const FeatureListPage = (props: FeatureListPageProps) => {
  const { user, featureList, search = '' } = props

  const store = useStore()

  useEffect(() => {
    store.init(featureList, search)
  }, [])

  return (
    <>
      <Page user={user}>
        <h2 className={styles.title}>Feature List</h2>

        <SearchInput
          defaultValue={search}
          onChange={(query) => {
            store.setSearch(query)
          }}
        />

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
