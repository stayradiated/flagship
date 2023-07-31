import { Link } from '@remix-run/react'
import cc from 'classcat'
import { areEqual } from 'react-window'
import { memo } from 'react'
import styles from './account-table-row.module.css'
import type { Account } from '~/lib/types'
import { Badge } from '~/components/badge'

type AccountTableRowProps = {
  index: number
  data: {
    rows: Array<Account | undefined>
  }
  style?: React.CSSProperties
}

const AccountTableRow = memo((props: AccountTableRowProps) => {
  const { style, index, data } = props
  const { rows } = data

  const account = rows[index]
    ? rows[index]!
    : {
        id: '',
        name: 'Loading...',
        labelList: [],
      }

  return (
    <div
      className={cc({
        [styles.container]: true,
        [styles.odd]: index % 2 === 0,
      })}
      style={style}
    >
      <div className={styles.id}>{account.id}</div>
      <Link to={`/accounts/${account.id}`} className={styles.name}>
        {account.name}
      </Link>
      <div className={styles.labelList}>
        {account.labelList.map((label, index) => (
          <Badge key={index}>
            <Badge.Label>{label.name}</Badge.Label>
            <Badge.Value>{label.value}</Badge.Value>
          </Badge>
        ))}
      </div>
    </div>
  )
}, areEqual)

export { AccountTableRow }
