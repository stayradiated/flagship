import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import type { Feature, AccountList } from '~/lib/types'
import { Page } from '~/components/page'
import { AccountTable } from '~/components/account-table'

type FeaturePageProps = {
  pageIndex: number
  pageSize: number
  feature: Feature
  accountList: AccountList
}

const FeaturePage = (props: FeaturePageProps) => {
  const { pageIndex, pageSize, feature, accountList } = props

  const { data, fetchNextPage, isFetching } = useInfiniteQuery<{
    pageSize: number
    pageIndex: number
    accountList: AccountList
  }>({
    queryKey: ['feature-page'],
    async queryFn({ pageParam: pageParameter = 1 }) {
      console.log(`Fetching page ${pageParameter}`)
      const response = await fetch(
        `/api/accounts/${feature.id}?i=${pageParameter}`,
      )
      const body = await response.json()
      return body
    },
    initialData: () => ({
      pages: [{ pageIndex, pageSize, accountList }],
      pageParams: [undefined, pageIndex],
    }),
    getNextPageParam(lastGroup) {
      return lastGroup.pageIndex + 1
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.accountList.items) ?? [],
    [data],
  )

  const totalDBRowCount = data?.pages?.[0]?.accountList.total ?? 0
  const totalFetched = flatData.length

  const hasMore = totalFetched < totalDBRowCount

  return (
    <>
      <Page>
        <h1>🚩 Feature</h1>
        <h2>{feature.name}</h2>
        <AccountTable
          accountList={accountList}
          isFetching={isFetching}
          hasMore={hasMore}
          fetchNextPage={fetchNextPage}
        />
      </Page>
    </>
  )
}

export { FeaturePage }
