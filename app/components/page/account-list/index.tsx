import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import type { AccountList } from '~/lib/types'
import { Page } from '~/components/page'
import { AccountTable } from '~/components/account-table'

type AccountListPageProps = {
  accountList: AccountList
  pageIndex: number
  pageSize: number
}

const AccountListPage = (props: AccountListPageProps) => {
  const { accountList, pageIndex, pageSize } = props

  const { data, fetchNextPage, isFetching } = useInfiniteQuery<{
    pageSize: number
    pageIndex: number
    accountList: AccountList
  }>({
    queryKey: ['account-list-page'],
    async queryFn({ pageParam: pageParameter = 1 }) {
      console.log(`Fetching page ${pageParameter}`)
      const response = await fetch(`/api/accounts?i=${pageParameter}`)
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
        <h2>Account List</h2>
        <AccountTable
          accountList={{
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

export { AccountListPage }