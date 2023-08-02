import type { User } from '@stayradiated/flagship-core'
import styles from './page.module.css'
import { PageHeader } from './page-header/index'

type PageProps = {
  user?: User
  children: React.ReactNode
}

const Page = (props: PageProps) => {
  const { user, children } = props

  return (
    <main className={styles.container}>
      <PageHeader user={user} />

      <div className={styles.hr} />

      {children}
    </main>
  )
}

export { Page }
