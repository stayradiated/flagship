import { Fragment } from 'react'
import { Link } from '@remix-run/react'
import { Menu, Transition } from '@headlessui/react'
import {
  UserCircleIcon,
  ChevronDownIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/20/solid'
import styles from './index.module.css'
import type { User } from '~/lib/types'

type PageHeaderUserMenuProps = {
  user: User
}

const PageHeaderUserMenu = (props: PageHeaderUserMenuProps) => {
  const { user } = props

  return (
    <div className={styles.container}>
      <Menu as="div" className={styles.menu}>
        <Menu.Button className={styles.menuButton}>
          <UserCircleIcon className={styles.userIcon} aria-hidden="true" />
          {user.name}
          <ChevronDownIcon className={styles.chevronIcon} aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className={styles.menuItems}>
            <Menu.Item>
              <Link to="/logout" className={styles.menuItemLink}>
                <ArrowLeftOnRectangleIcon
                  className={styles.logoutIcon}
                  aria-hidden="true"
                />
                Logout
              </Link>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export { PageHeaderUserMenu }
