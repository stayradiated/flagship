import styles from './badge.module.css'

type BadgeProps = {
  children: React.ReactNode
}

const Badge = (props: BadgeProps) => {
  const { children } = props
  return <div className={styles.badge}>{children}</div>
}

type BadgeLabelProps = {
  children: React.ReactNode
}

const BadgeLabel = (props: BadgeLabelProps) => {
  const { children } = props
  return <span className={styles.label}>{children}</span>
}

type BadgeValueProps = {
  children: React.ReactNode
}

const BadgeValue = (props: BadgeValueProps) => {
  const { children } = props
  return <span className={styles.value}>{children}</span>
}

Badge.Label = BadgeLabel
Badge.Value = BadgeValue

export { Badge }
