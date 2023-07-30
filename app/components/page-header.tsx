import { Link } from '@remix-run/react'
import { Menu } from '@headlessui/react'
import styles from './page-header.module.css'
import { PageHeaderNavLink } from './page-header-nav-link'
import type { User } from '~/lib/types'

type PageHeaderProps = {
  user?: User
}

const PageHeader = (props: PageHeaderProps) => {
  const { user } = props

  return (
    <header className={styles.container}>
      <h1>
        <Link to="/" className={styles.title}>
          🚢 Flagship
        </Link>
      </h1>

      {user && (
        <nav className={styles.nav}>
          <PageHeaderNavLink to="/features">Features</PageHeaderNavLink>
          <PageHeaderNavLink to="/accounts">Accounts</PageHeaderNavLink>

          <Menu>
            <Menu.Button>{user.name}</Menu.Button>
            <Menu.Items>
              <Menu.Item>
                <Link to="/logout">Logout</Link>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </nav>
      )}
    </header>
  )
}

export { PageHeader }
