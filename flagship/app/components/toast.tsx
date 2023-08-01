import cc from 'classcat'
import styles from './toast.module.css'

type ToastProps = {
  accountName: string
  featureName: string
  enabled: boolean
  visible: boolean
}

const ToggleFeatureToast = (props: ToastProps) => {
  const { accountName, featureName, enabled, visible } = props

  return (
    <div
      className={cc({
        [styles.container]: true,
        [styles.enabled]: enabled,
        [styles.disabled]: !enabled,

        [styles.enter]: visible,
        [styles.leave]: !visible,
      })}
    >
      <span className={styles.featureName}>{featureName}</span> has been{' '}
      {enabled ? 'enabled' : 'disabled'} for {accountName}
    </div>
  )
}

export { ToggleFeatureToast }
