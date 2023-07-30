import type {
  V2_MetaFunction,
  LoaderFunction,
  ActionFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { createRunnBackend } from '~/lib/runn.server'
import type { Account, FeatureList, User } from '~/lib/types'
import { AccountPage } from '~/components/page/account'
import { getAuthenticator } from '~/lib/auth.server'
import { namedAction } from '~/lib/utils/named-action'

type LoaderData = {
  user: User
  account: Account
  featureList: FeatureList
}

const meta: V2_MetaFunction<LoaderData> = ({ data }) => {
  const { account } = data
  return [
    { title: `${account.name} • Flagship` },
    { name: 'description', content: 'Manage Feature Flags' },
  ]
}

const $Parameters = z.object({
  accountId: z.string(),
})

const loader: LoaderFunction = async ({ request, params }) => {
  const backend = createRunnBackend()
  const authenticator = getAuthenticator(backend)

  const user = await authenticator.authenticate('google', request, {
    failureRedirect: '/login',
  })

  const { accountId } = $Parameters.parse(params)

  const [account, featureList] = await Promise.all([
    backend.getAccount({ id: accountId }),
    backend.getFeatureListForAccount({
      accountId,
      take: 30,
      skip: 0,
    }),
  ])

  return json<LoaderData>({ account, featureList, user })
}

const $ToggleFeatureFormData = zfd.formData({
  featureId: zfd.text(),
  enabled: zfd.checkbox(),
})

const action: ActionFunction = async ({ request, params }) => {
  const backend = createRunnBackend()

  return namedAction(request, {
    async toggleFeature() {
      const { accountId } = $Parameters.parse(params)
      const { featureId, enabled } = $ToggleFeatureFormData.parse(
        await request.formData(),
      )

      console.log('toggleFeature', { accountId, featureId, enabled })

      await backend.updateFeatureList([
        {
          accountId,
          featureId,
          enabled,
        },
      ])

      return json({
        message: 'Feature toggled',
      })
    },
  })
}

const Route = () => {
  const { user, account, featureList } = useLoaderData<LoaderData>()

  return <AccountPage account={account} featureList={featureList} user={user} />
}

export { meta, loader, action }
export default Route
