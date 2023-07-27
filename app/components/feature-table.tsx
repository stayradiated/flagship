import { Link } from '@remix-run/react'
import * as dateFns from 'date-fns'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Table, CellStrong } from './table'
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
    size: 10,
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: CellStrong,
    size: 30,
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    size: 60,
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell(info) {
      const createdAt = dateFns.toDate(info.getValue())
      return dateFns.format(createdAt, 'dd MMM yyyy')
    },
    size: 30,
  }),
  columnHelper.accessor('id', {
    id: 'view',
    header: '...',
    cell(info) {
      return <Link to={`/features/${info.getValue()}`}>View</Link>
    },
    size: 0,
  }),
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

export { FeatureTable }
