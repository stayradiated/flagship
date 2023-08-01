import cc from 'classcat'
import styles from './table-head.module.css'

type TableHeadProps = {
  children: React.ReactNode
}

const TableHead = (props: TableHeadProps) => {
  const { children } = props
  return <div className={styles.container}>{children}</div>
}

type TableHeadColumnProps = {
  children?: React.ReactNode
  className?: string
}

const TableHeadColumn = (props: TableHeadColumnProps) => {
  const { children, className } = props
  return <div className={cc([styles.column, className])}>{children}</div>
}

TableHead.Column = TableHeadColumn

export { TableHead }
