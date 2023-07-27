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
  isFetching: boolean
  hasMore: boolean
  fetchNextPage: () => void
}

const Table = <Data,>(props: TableProps<Data>) => {
  const { table, isFetching, hasMore, fetchNextPage } = props

  const { rows } = table.getRowModel()

  const tableContainerRef = useRef<HTMLDivElement>(null)

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement
        if (
          scrollHeight - scrollTop - clientHeight < 30 &&
          !isFetching &&
          hasMore
        ) {
          fetchNextPage()
        }
      }
    },
    [fetchNextPage, isFetching, hasMore],
  )

  // A check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current)
  }, [fetchMoreOnBottomReached])

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 50,
    overscan: 10,
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
                  flexBasis: header.getSize(),
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
      <div
        className={styles.container}
        onScroll={(e) => {
          fetchMoreOnBottomReached(e.target as HTMLDivElement)
        }}
        ref={tableContainerRef}
      >
        <div
          className={styles.table}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          <div className={styles.tbody}>
            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
              const row = rows[virtualItem.index]
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
                          flexBasis: cell.column.getSize(),
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
      </div>
    </>
  )
}

export { Table, CellIdentifier, CellStrong }
