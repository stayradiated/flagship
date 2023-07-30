import { Link } from '@remix-run/react'
import styles from './account-table-row.module.css'
import type { Account } from '~/lib/types'

type AccountTableRowProps = {
  account: Account | undefined
  style?: React.CSSProperties
}

const AccountTableRow = (props: AccountTableRowProps) => {
  const { account, style } = props

  if (!account) {
    return (
      <div className={styles.container} style={style}>
        <div className={styles.id}>Loading...</div>
      </div>
    )
  }

  return (
    <div className={styles.container} style={style}>
      <div>
        <code className={styles.id}>{account.id}</code>
      </div>
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
