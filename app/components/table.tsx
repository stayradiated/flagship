import { flexRender } from '@tanstack/react-table'
import type {
  Table as TanstackReactTable,
  CellContext,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef, useEffect, useCallback } from 'react'
import styles from './table.module.css'

const CellIdentifier = <Data,>(info: CellContext<Data, React.ReactNode>) => (
  <span className={styles.identifier}>{info.getValue()}</span>
)

const CellStrong = <Data,>(info: CellContext<Data, React.ReactNode>) => (
  <span className={styles.strong}>{info.getValue()}</span>
)

type TableProps<Data> = {
  table: TanstackReactTable<Data>
  totalRowCount: number
  isFetching: boolean
  hasMore: boolean
  fetchNextPage: () => void
}

const Table = <Data,>(props: TableProps<Data>) => {
  const { table, totalRowCount, isFetching, hasMore, fetchNextPage } = props

  const { rows } = table.getRowModel()

  const tableContainerRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: totalRowCount,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 38,
    overscan: 30,
  })

  return (
    <>
      <div className={styles.thead}>
        {table.getHeaderGroups().map((headerGroup) => (
          <div key={headerGroup.id} className={styles.tr}>
            {headerGroup.headers.map((header) => (
              <div
                key={header.id}
                className={styles.th}
                style={{
                  flex: header.getSize(),
                }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.container} ref={tableContainerRef}>
        <div
          className={styles.table}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const row = rows[virtualItem.index]

            if (!row) {
              return (
                <div
                  key={virtualItem.key}
                  className={styles.tr}
                  style={{
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                />
              )
            }

            return (
              <div
                key={virtualItem.key}
                className={styles.tr}
                style={{
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <div
                      key={cell.id}
                      className={styles.td}
                      style={{
                        flex: cell.column.getSize(),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export { Table, CellIdentifier, CellStrong }
