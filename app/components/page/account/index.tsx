import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import styles from './index.module.css'
import type { Account, FeatureList, User } from '~/lib/types'
import { Page } from '~/components/page'
import { FeatureTable } from '~/components/feature-table'

type AccountPageProps = {
  user: User
  pageIndex: number
  pageSize: number
  account: Account
  featureList: FeatureList
}

const AccountPage = (props: AccountPageProps) => {
  const { user, pageIndex, pageSize, account, featureList } = props

  const { data, fetchNextPage, isFetching } = useInfiniteQuery<{
    pageSize: number
    pageIndex: number
    featureList: FeatureList
  }>({
    queryKey: ['account-page'],
    async queryFn({ pageParam: pageParameter = 1 }) {
      console.log(`Fetching page ${pageParameter}`)
      const response = await fetch(
        `/api/features/${account.id}?i=${pageParameter}&s=${pageSize}`,
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
          featureList={featureList}
          isFetching={isFetching}
          hasMore={hasMore}
          fetchNextPage={fetchNextPage}
        />
      </Page>
    </>
  )
}

export { AccountPage }
