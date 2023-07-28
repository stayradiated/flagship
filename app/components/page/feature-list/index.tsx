import { useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import styles from './index.module.css'
import type { FeatureList, User } from '~/lib/types'
import { Page } from '~/components/page'
import { FeatureTable } from '~/components/feature-table'

type FeatureListPageProps = {
  pageIndex: number
  pageSize: number
  featureList: FeatureList
  user: User
}

const FeatureListPage = (props: FeatureListPageProps) => {
  const { user, pageIndex, pageSize, featureList } = props

  const { data, fetchNextPage, isFetching } = useInfiniteQuery<{
    pageSize: number
    pageIndex: number
    featureList: FeatureList
  }>({
    queryKey: ['feature-list-page'],
    async queryFn({ pageParam: pageParameter = 1 }) {
      console.log(`Fetching page ${pageParameter}`)
      const response = await fetch(
        `/api/features?i=${pageParameter}&s=${pageSize}`,
      )
      const body = await response.json()
      return body
    },
    initialData: () => ({
      pages: [{ pageIndex, pageSize, featureList }],
      pageParams: [undefined, pageIndex],
    }),
    getNextPageParam(lastGroup) {
      return lastGroup.pageIndex + 1
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.featureList.items) ?? [],
    [data],
  )

  const totalDBRowCount = data?.pages?.[0]?.featureList.total ?? 0
  const totalFetched = flatData.length

  const hasMore = totalFetched < totalDBRowCount

  return (
    <>
      <Page user={user}>
        <h2 className={styles.title}>Feature List</h2>
        <FeatureTable
          featureList={{
            items: flatData,
            total: totalDBRowCount,
          }}
          isFetching={isFetching}
          hasMore={hasMore}
          fetchNextPage={fetchNextPage}
        />
      </Page>
    </>
  )
}

export { FeatureListPage }
