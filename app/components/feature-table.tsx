import { Link as RemixLink } from '@remix-run/react'
import * as dateFns from 'date-fns'
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
  Switch,
} from '@chakra-ui/react'
import type { FeatureList } from '~/lib/types'

type FeatureTableProps = {
  featureList: FeatureList
}

const FeatureTable = (props: FeatureTableProps) => {
  const { featureList } = props

  return (
    <TableContainer>
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Created At</Th>
            <Th>Enabled</Th>
            <Th>...</Th>
          </Tr>
        </Thead>
        <Tbody>
          {featureList.items.map((feature) => {
            const createdAt = dateFns.toDate(feature.createdAt)

            return (
              <Tr key={feature.id}>
                <Td>
                  <Code>{feature.id}</Code>
                </Td>
                <Td>{feature.name}</Td>
                <Td>{feature.description}</Td>
                <Td>{dateFns.format(createdAt, 'dd MMM yyyy')}</Td>
                <Td>
                  <Switch
                    colorScheme={
                      feature.enabled === feature.defaultEnabled
                        ? 'green'
                        : 'blue'
                    }
                    isChecked={feature.enabled ?? feature.defaultEnabled}
                  />
                </Td>
                <Td>
                  <Link as={RemixLink} to={`/features/${feature.id}`}>
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

export { FeatureTable }
