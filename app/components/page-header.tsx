import { Link } from '@remix-run/react'
import styles from './page-header.module.css'
import { PageHeaderNavLink } from './page-header-nav-link'

const PageHeader = () => {
  return (
    <header className={styles.container}>
      <h1>
        <Link to="/" className={styles.title}>
          🚢 Flagship
        </Link>
      </h1>

      <nav className={styles.nav}>
        <PageHeaderNavLink to="/features">Features</PageHeaderNavLink>
        <PageHeaderNavLink to="/accounts">Accounts</PageHeaderNavLink>
        <PageHeaderNavLink to="/logout">Logout</PageHeaderNavLink>
      </nav>
    </header>
  )
}

export { PageHeader }
