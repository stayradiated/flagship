import { Link } from '@remix-run/react'
import cc from 'classcat'
import styles from './account-table-row.module.css'
import type { Account } from '~/lib/types'

type AccountTableRowProps = {
  index: number
  account: Account | undefined
  style?: React.CSSProperties
}

const AccountTableRow = (props: AccountTableRowProps) => {
  const { account: rAccount, style, index } = props

  const account = rAccount
    ? rAccount
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
          <span key={index}>
            {label.name}: {label.value}
          </span>
        ))}
      </div>
    </div>
  )
}

export { AccountTableRow }
