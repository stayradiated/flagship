import { Link } from '@remix-run/react'
import * as dateFns from 'date-fns'
import cc from 'classcat'
import { areEqual } from 'react-window'
import { memo } from 'react'
import styles from './feature-table-row.module.css'
import type { Feature } from '~/lib/types'
import { Switch } from '~/components/switch'

type FeatureTableRowProps = {
  index: number
  style?: React.CSSProperties
  data: {
    rows: Array<Feature | undefined>
    onToggleFeature?: (options: {
      accountId: string
      featureId: string
      enabled: boolean
    }) => void
  }
}

const FeatureTableRow = memo((props: FeatureTableRowProps) => {
  const { data, style, index } = props
  const { rows, onToggleFeature } = data

  const feature = rows[index]
    ? rows[index]!
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
          <Switch onChange={handleToggle} checked={feature.enabled} />
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
}, areEqual)

export { FeatureTableRow }
