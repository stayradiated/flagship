import { Link } from '@remix-run/react'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Table, CellIdentifier } from './table'
import type { Account, AccountList } from '~/lib/types'

const columnHelper = createColumnHelper<Account>()

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: CellIdentifier,
    size: 1,
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell(info) {
      return (
        <Link to={`/accounts/${info.row.original.id}`}>{info.getValue()}</Link>
      )
    },
    size: 6,
  }),
  columnHelper.accessor('labelList', {
    header: 'Labels',
    cell: (info) =>
      info.getValue().map((label, index) => (
        <span key={index}>
          {label.name}: {label.value}
        </span>
      )),
    size: 10,
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
    defaultColumn: {
      minSize: 0,
      size: 1,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
  })

  return (
    <Table
      table={table}
      totalRowCount={accountList.total}
      isFetching={isFetching}
      hasMore={hasMore}
      fetchNextPage={fetchNextPage}
    />
  )
}

export { AccountTable }
