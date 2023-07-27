import { flexRender } from '@tanstack/react-table'
import type {
  Table as TanstackReactTable,
  CellContext,
} from '@tanstack/react-table'
import { useVirtual } from 'react-virtual'
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

  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  })

  const { virtualItems: virtualRows, totalSize } = rowVirtualizer

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0

  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  return (
    <div
      className={styles.container}
      onScroll={(e) => {
        fetchMoreOnBottomReached(e.target as HTMLDivElement)
      }}
      ref={tableContainerRef}
    >
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={styles.th}
                  style={{
                    width: header.getSize(),
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {paddingTop > 0 && (
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
          )}

          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index]
            return (
              <tr key={row.id} className={styles.tr}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className={styles.td}
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}

          {paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export { Table, CellIdentifier, CellStrong }
