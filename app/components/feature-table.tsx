import { Link } from '@remix-run/react'
import * as dateFns from 'date-fns'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Table } from './table'
import styles from './feature-table.module.css'
import type { Feature, FeatureList } from '~/lib/types'

const columnHelper = createColumnHelper<Feature>()

const columns = [
  columnHelper.accessor('enabled', {
    header: '',
    cell(info) {
      return (
        <input
          type="checkbox"
          defaultChecked={info.getValue()}
          autoComplete="off"
        />
      )
    },
    size: 1,
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => (
      <Link to={`/features/${info.row.original.id}`} className={styles.name}>
        {info.getValue()}
      </Link>
    ),
    size: 6,
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    size: 20,
  }),
  columnHelper.accessor(
    (row) => {
      const createdAt = dateFns.toDate(row.createdAt)
      return dateFns.format(createdAt, 'dd MMM yyyy')
    },
    {
      id: 'created-at',
      header: 'Created At',
      cell: (info) => <span className={styles.date}>{info.getValue()}</span>,
      size: 3,
    },
  ),
]

type FeatureTableProps = {
  featureList: FeatureList
  isFetching: boolean
  hasMore: boolean
  fetchNextPage: () => void
}

const FeatureTable = (props: FeatureTableProps) => {
  const { featureList, isFetching, hasMore, fetchNextPage } = props

  const table = useReactTable({
    data: featureList.items,
    columns,
    getCoreRowModel: getCoreRowModel<Feature>(),
    defaultColumn: {
      minSize: 0,
      size: 1,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
  })

  return (
    <Table
      table={table}
      totalRowCount={featureList.total}
      isFetching={isFetching}
      hasMore={hasMore}
      fetchNextPage={fetchNextPage}
    />
  )
}

export { FeatureTable }
