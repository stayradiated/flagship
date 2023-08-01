import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import normalizeStyles from 'normalize.css'
import { Toaster } from 'react-hot-toast'
import pollenStyles from '~/pollen.css'

const links: LinksFunction = () => [
  { rel: 'stylesheet', href: normalizeStyles },
  { rel: 'stylesheet', href: pollenStyles },

  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),

  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600;700&display=swap',
  },
]

const Route = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}

export { links }
export default Route
