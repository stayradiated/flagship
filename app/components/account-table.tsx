import { Link } from '@remix-run/react'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Table, CellIdentifier, CellStrong } from './table'
import type { Account, AccountList } from '~/lib/types'

const columnHelper = createColumnHelper<Account>()

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: CellIdentifier,
    size: 10,
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: CellStrong,
  }),
  columnHelper.accessor('labelList', {
    header: 'Labels',
    cell: (info) =>
      info.getValue().map((label, index) => (
        <span key={index}>
          {label.name}: {label.value}
        </span>
      )),
  }),
  columnHelper.accessor('id', {
    id: 'view',
    header: '...',
    cell(info) {
      return <Link to={`/accounts/${info.getValue()}`}>View</Link>
    },
  }),
]

type AccountTableProps = {
  accountList: AccountList
  isFetching: boolean
  hasMore: boolean
  fetchNextPage: () => void
}

const AccountTable = (props: AccountTableProps) => {
  const { accountList, isFetching, hasMore, fetchNextPage } = props

  const table = useReactTable({
    data: accountList.items,
    columns,
    getCoreRowModel: getCoreRowModel<Account>(),
  })

  return (
    <Table
      table={table}
      isFetching={isFetching}
      hasMore={hasMore}
      fetchNextPage={fetchNextPage}
    />
  )
}

export { AccountTable }
