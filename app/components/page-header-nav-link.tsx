import { NavLink } from '@remix-run/react'
import type { NavLinkProps } from '@remix-run/react'
import cc from 'classcat'
import styles from './page-header-nav-link.module.css'

type PageHeaderNavLinkProps = NavLinkProps

const PageHeaderNavLink = (props: PageHeaderNavLinkProps) => {
  const { className, ...otherProps } = props

  return (
    <NavLink
      {...otherProps}
      className={({ isActive }) =>
        cc([
          className,
          styles.link,
          {
            [styles.isActive]: isActive,
          },
        ])
      }
    />
  )
}

export { PageHeaderNavLink }
