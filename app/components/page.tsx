import { PageHeader } from './page-header'
import styles from './page.module.css'

type PageProps = {
  children: React.ReactNode
}

const Page = (props: PageProps) => {
  const { children } = props

  return (
    <main className={styles.container}>
      <PageHeader />

      <div className={styles.hr} />

      {children}
    </main>
  )
}

export { Page }
