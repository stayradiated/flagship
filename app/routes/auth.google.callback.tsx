import type { LoaderFunction } from '@remix-run/node'
import { authenticator } from '~/lib/auth.server'

const loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate('google', request, {
    successRedirect: '/',
    failureRedirect: '/login',
  })
}

export { loader }
