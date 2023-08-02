import { useMemo } from 'react'
import type { Range } from '@stayradiated/mandarin'
import type { Account } from '@stayradiated/flagship-core'
import styles from './account-table.module.css'
import { AccountTableRow } from './account-table-row'
import { VirtualList } from './virtual-list'
import { TableHead } from '~/components/table-head'

type AccountTableProps = {
  rows: Array<Account | undefined>
  total: number
  isLoaded: (index: number) => boolean
  loadRange: (range: Range) => Promise<void>
}

const AccountTable = (props: AccountTableProps) => {
  const { rows, total, isLoaded, loadRange } = props

  const data = useMemo(
    () => ({
      rows,
    }),
    [rows],
  )

  return (
    <div className={styles.container}>
      <TableHead>
        <TableHead.Column className={styles.id}>ID</TableHead.Column>
        <TableHead.Column className={styles.name}>Name</TableHead.Column>
        <TableHead.Column className={styles.properties}>
          Properties
        </TableHead.Column>
      </TableHead>
      <VirtualList
        rowHeight={40}
        data={data}
        total={total}
        isLoaded={isLoaded}
        loadRange={loadRange}
        RowComponent={AccountTableRow}
      />
    </div>
  )
}

export { AccountTable }
