import { Form } from '@remix-run/react'
import styles from './login.module.css'
import { Page } from '~/components/page'

type LoginPageProps = {
  error?: {
    message: string
  }
}

const LoginPage = (props: LoginPageProps) => {
  const { error } = props

  return (
    <Page>
      <Form action="/auth/google" method="post">
        <button className={styles.button}>Sign in with Google</button>
      </Form>

      {error && <p className={styles.error}>⚠️ {error.message}</p>}
    </Page>
  )
}

export { LoginPage }
