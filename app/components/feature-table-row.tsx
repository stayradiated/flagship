import { Link } from '@remix-run/react'
import * as dateFns from 'date-fns'
import cc from 'classcat'
import styles from './feature-table-row.module.css'
import type { Feature } from '~/lib/types'

type FeatureTableRowProps = {
  index: number
  feature: Feature | undefined
  style?: React.CSSProperties
}

const FeatureTableRow = (props: FeatureTableRowProps) => {
  const { feature: rFeature, style, index } = props

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

  return (
    <div
      className={cc({
        [styles.container]: true,
        [styles.odd]: index % 2 === 0,
      })}
      style={style}
    >
      <div>
        <input
          type="checkbox"
          defaultChecked={feature.enabled}
          autoComplete="off"
        />
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
