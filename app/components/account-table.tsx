import { useMemo } from 'react'
import type { Range } from '@stayradiated/mandarin'
import styles from './account-table.module.css'
import { AccountTableRow } from './account-table-row'
import { VirtualList } from './virtual-list'
import type { Account } from '~/lib/types'

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
      <VirtualList
        rowHeight={35}
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
