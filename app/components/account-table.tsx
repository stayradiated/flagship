import AutoSizer from 'react-virtualized-auto-sizer'
import InfiniteLoader from 'react-window-infinite-loader'
import { FixedSizeList as List } from 'react-window'
import { AccountTableRow } from './account-table-row'
import styles from './account-table.module.css'
import type { Account } from '~/lib/types'

type AccountTableProps = {
  rows: Array<Account | undefined>
  total: number
  isLoaded: (index: number) => boolean
  loadRange: (startIndex: number, stopIndex: number) => Promise<void>
}

const AccountTable = (props: AccountTableProps) => {
  const { rows, total, isLoaded, loadRange } = props

  return (
    <div className={styles.container}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isLoaded}
            itemCount={total}
            loadMoreItems={loadRange}
            minimumBatchSize={20}
            threshold={2}
          >
            {({ onItemsRendered, ref }) => (
              <List
                onItemsRendered={onItemsRendered}
                ref={ref}
                width={width}
                height={height}
                itemCount={total}
                itemSize={35}
                overscanCount={10}
              >
                {({ index, style }) => (
                  <AccountTableRow account={rows[index]} style={style} />
                )}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  )
}

export { AccountTable }
