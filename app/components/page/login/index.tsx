import { Form } from '@remix-run/react'
import { Page } from '~/components/page'

const LoginPage = () => {
  return (
    <Page>
      <Form action="/auth/google" method="post">
        <button>Sign in with Google</button>
      </Form>
    </Page>
  )
}

export { LoginPage }
