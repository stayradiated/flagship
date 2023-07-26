import { Link as RemixLink } from '@remix-run/react'
import {
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Code,
} from '@chakra-ui/react'
import type { AccountList } from '~/lib/types'

type AccountTableProps = {
  accountList: AccountList
}

const AccountTable = (props: AccountTableProps) => {
  const { accountList } = props

  return (
    <TableContainer>
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Labels</Th>
            <Th>...</Th>
          </Tr>
        </Thead>
        <Tbody>
          {accountList.items.map((account) => {
            return (
              <Tr key={account.id}>
                <Td>
                  <Code>{account.id}</Code>
                </Td>
                <Td>{account.name}</Td>
                <Td>
                  {account.labelList
                    .map((label) => {
                      return `${label.name}: ${label.value}`
                    })
                    .join(', ')}
                </Td>
                <Td>
                  <Link as={RemixLink} to={`/accounts/${account.id}`}>
                    View
                  </Link>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export { AccountTable }
