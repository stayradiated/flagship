import { Link } from '@remix-run/react'
import { memo } from 'react'
import { FlagIcon, UserIcon } from '@heroicons/react/24/solid'
import { PageHeaderNavLink } from './nav-link/index'
import { PageHeaderUserMenu } from './user-menu/index'
import styles from './index.module.css'
import type { User } from '~/lib/types'

type PageHeaderProps = {
  user?: User
}

const PageHeader = memo((props: PageHeaderProps) => {
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
          <PageHeaderNavLink to="/features" end>
            <FlagIcon className={styles.icon} />
            Features
          </PageHeaderNavLink>
          <PageHeaderNavLink to="/accounts" end>
            <UserIcon className={styles.icon} />
            Accounts
          </PageHeaderNavLink>

          <PageHeaderUserMenu user={user} />
        </nav>
      )}
    </header>
  )
})

export { PageHeader }
