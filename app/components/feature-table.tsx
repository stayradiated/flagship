import { useMemo } from 'react'
import type { Range } from '@stayradiated/mandarin'
import styles from './feature-table.module.css'
import { VirtualList } from './virtual-list'
import { FeatureTableRow } from './feature-table-row'
import type { Feature } from '~/lib/types'
import { TableHead } from '~/components/table-head'

type FeatureTableProps = {
  rows: Array<Feature | undefined>
  total: number
  isLoaded: (index: number) => boolean
  loadRange: (range: Range) => Promise<void>

  onToggleFeature?: (options: {
    accountId: string
    featureId: string
    enabled: boolean
  }) => void
}

const FeatureTable = (props: FeatureTableProps) => {
  const { rows, total, isLoaded, loadRange, onToggleFeature } = props

  const data = useMemo(
    () => ({
      rows,
      onToggleFeature,
    }),
    [rows, onToggleFeature],
  )

  return (
    <div className={styles.container}>
      <TableHead>
        <TableHead.Column className={styles.switch} />
        <TableHead.Column className={styles.name}>Name</TableHead.Column>
        <TableHead.Column className={styles.description}>
          Description
        </TableHead.Column>
        <TableHead.Column className={styles.createdAt}>
          Created At
        </TableHead.Column>
      </TableHead>
      <VirtualList
        rowHeight={35}
        data={data}
        total={total}
        isLoaded={isLoaded}
        loadRange={loadRange}
        RowComponent={FeatureTableRow}
      />
    </div>
  )
}

export { FeatureTable }
