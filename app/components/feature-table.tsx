import { Link } from '@remix-run/react'
import * as dateFns from 'date-fns'
import type { FeatureList } from '~/lib/types'

type FeatureTableProps = {
  featureList: FeatureList
}

const FeatureTable = (props: FeatureTableProps) => {
  const { featureList } = props

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Created At</th>
          <th>Enabled</th>
          <th>...</th>
        </tr>
      </thead>
      <tbody>
        {featureList.items.map((feature) => {
          const createdAt = dateFns.toDate(feature.createdAt)

          return (
            <tr key={feature.id}>
              <td>
                <code>{feature.id}</code>
              </td>
              <td>{feature.name}</td>
              <td>{feature.description}</td>
              <td>{dateFns.format(createdAt, 'dd MMM yyyy')}</td>
              <td>
                <input
                  type="checkbox"
                  checked={feature.enabled ?? feature.defaultEnabled}
                  autoComplete="off"
                />
              </td>
              <td>
                <Link to={`/features/${feature.id}`}>View</Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export { FeatureTable }
