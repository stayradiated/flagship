import AutoSizer from 'react-virtualized-auto-sizer'
import InfiniteLoader from 'react-window-infinite-loader'
import { FixedSizeList as List } from 'react-window'
import type { Range } from '@stayradiated/mandarin'
import type { ListChildComponentProps } from 'react-window'

type VirtualListProps<Data> = {
  data: Data
  total: number
  rowHeight: number

  isLoaded: (index: number) => boolean
  loadRange: (range: Range) => Promise<void>

  RowComponent: React.ComponentType<ListChildComponentProps<Data>>
}

const VirtualList = <Data,>(props: VirtualListProps<Data>) => {
  const { data, total, rowHeight, isLoaded, loadRange, RowComponent } = props

  const handleLoadMoreItems = async (start: number, endInclusive: number) => {
    const end = endInclusive + 1
    return loadRange([start, end])
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isLoaded}
          itemCount={total}
          loadMoreItems={handleLoadMoreItems}
          minimumBatchSize={10}
          threshold={2}
        >
          {({ onItemsRendered, ref }) => (
            <List
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={width}
              height={height}
              itemCount={total}
              itemSize={rowHeight}
              overscanCount={15}
              itemData={data}
            >
              {RowComponent}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  )
}

export { VirtualList }
