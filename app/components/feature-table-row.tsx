import { Link } from '@remix-run/react'
import * as dateFns from 'date-fns'
import styles from './feature-table-row.module.css'
import type { Feature } from '~/lib/types'

type FeatureTableRowProps = {
  feature: Feature | undefined
  style?: React.CSSProperties
}

const FeatureTableRow = (props: FeatureTableRowProps) => {
  const { feature, style } = props

  if (!feature) {
    return (
      <div className={styles.container} style={style}>
        <div className={styles.name}>Loading...</div>
      </div>
    )
  }

  const createdAt = dateFns.format(
    dateFns.toDate(feature.createdAt),
    'dd MMM yyyy',
  )

  return (
    <div className={styles.container} style={style}>
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
