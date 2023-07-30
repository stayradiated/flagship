import { Link } from '@remix-run/react'
import * as dateFns from 'date-fns'
import cc from 'classcat'
import { Switch } from '@headlessui/react'
import styles from './feature-table-row.module.css'
import type { Feature } from '~/lib/types'

type FeatureTableRowProps = {
  index: number
  feature: Feature | undefined
  style?: React.CSSProperties
  onToggleFeature?: (options: {
    accountId: string
    featureId: string
    enabled: boolean
  }) => void
}

const FeatureTableRow = (props: FeatureTableRowProps) => {
  const { feature: rFeature, style, index, onToggleFeature } = props

  const feature = rFeature
    ? rFeature
    : {
        id: '',
        name: 'Loading...',
        description: '',
        enabled: false,
        createdAt: 0,
      }

  const createdAt = dateFns.format(
    dateFns.toDate(feature.createdAt),
    'dd MMM yyyy',
  )

  const editable = typeof onToggleFeature === 'function'

  const handleToggle = (checked: boolean) => {
    onToggleFeature?.({
      accountId: '1',
      featureId: feature.id,
      enabled: checked,
    })
  }

  return (
    <div
      className={cc({
        [styles.container]: true,
        [styles.odd]: index % 2 === 0,
      })}
      style={style}
    >
      <div>
        {editable ? (
          <Switch checked={feature.enabled} onChange={handleToggle}>
            <p>{feature.enabled ? '✓' : 'x'}</p>
          </Switch>
        ) : (
          <p>{feature.enabled ? '✓' : 'x'}</p>
        )}
      </div>
      <Link to={`/features/${feature.id}`} className={styles.name}>
        {feature.name}
      </Link>
      <div className={styles.description}>{feature.description}</div>
      <div className={styles.date}>{createdAt}</div>
    </div>
  )
}

export { FeatureTableRow }
