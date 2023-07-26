import { Link } from '@remix-run/react'
import type { AccountList } from '~/lib/types'

type AccountTableProps = {
  accountList: AccountList
}

const AccountTable = (props: AccountTableProps) => {
  const { accountList } = props

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Labels</th>
          <th>...</th>
        </tr>
      </thead>
      <tbody>
        {accountList.items.map((account) => {
          return (
            <tr key={account.id}>
              <td>
                <code>{account.id}</code>
              </td>
              <td>{account.name}</td>
              <td>
                {account.labelList
                  .map((label) => {
                    return `${label.name}: ${label.value}`
                  })
                  .join(', ')}
              </td>
              <td>
                <Link to={`/accounts/${account.id}`}>View</Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export { AccountTable }
