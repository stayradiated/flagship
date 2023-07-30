import { useState } from 'react'
import { Link, useFetcher } from '@remix-run/react'
import * as dateFns from 'date-fns'
import cc from 'classcat'
import { Switch } from '@headlessui/react'
import styles from './feature-table-row.module.css'
import type { Feature } from '~/lib/types'

type FeatureTableRowProps = {
  index: number
  feature: Feature | undefined
  style?: React.CSSProperties
}

const FeatureTableRow = (props: FeatureTableRowProps) => {
  const { feature: rFeature, style, index } = props

  const fetcher = useFetcher()
  const [enabled, setEnabled] = useState(false)

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

  const handleToggle = (checked: boolean) => {
    setEnabled(checked)

    const data: {
      featureId: string
      enabled?: 'on'
    } = {
      featureId: feature.id,
    }

    if (checked) {
      data.enabled = 'on'
    }

    fetcher.submit(data, { method: 'post', action: '?_action=toggleFeature' })
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
        <Switch checked={enabled} onChange={handleToggle}>
          <p>{enabled ? '✓' : 'x'}</p>
        </Switch>
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
