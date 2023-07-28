import { Link } from '@remix-run/react'
import styles from './page-header.module.css'
import { PageHeaderNavLink } from './page-header-nav-link'
import type { User } from '~/lib/types'

type PageHeaderProps = {
  user?: User
}

const PageHeader = (props: PageHeaderProps) => {
  const { user } = props

  console.log({ user })

  return (
    <header className={styles.container}>
      <h1>
        <Link to="/" className={styles.title}>
          🚢 Flagship
        </Link>
      </h1>

      {user && (
        <nav className={styles.nav}>
          <p>{user.name}</p>
          <PageHeaderNavLink to="/features">Features</PageHeaderNavLink>
          <PageHeaderNavLink to="/accounts">Accounts</PageHeaderNavLink>
          <PageHeaderNavLink to="/logout">Logout</PageHeaderNavLink>
        </nav>
      )}
    </header>
  )
}

export { PageHeader }
