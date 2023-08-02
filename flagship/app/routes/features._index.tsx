import {
  json,
  type V2_MetaFunction,
  type LoaderFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { zfd } from 'zod-form-data'
import { z } from 'zod'
import type { FeatureList, User } from '@stayradiated/flagship-core'
import { createBackend } from '~/lib/backend.server'
import { FeatureListPage } from '~/components/page/feature-list'
import { getAuthenticator } from '~/lib/auth.server'

const meta: V2_MetaFunction = () => {
  return [
    { title: 'Features • Flagship' },
    { name: 'description', content: 'Manage Feature Flags' },
  ]
}

type LoaderData = {
  featureList: FeatureList
  user: User
  search?: string
}

const $LoaderSearchParameters = zfd.formData({
  search: zfd.text(z.string().optional()),
})

const loader: LoaderFunction = async ({ request }) => {
  const backend = createBackend()
  const authenticator = getAuthenticator(backend)

  const user = await authenticator.authenticate('google', request, {
    failureRedirect: '/login',
  })

  const url = new URL(request.url)
  const { search } = $LoaderSearchParameters.parse(url.searchParams)

  const featureList = await backend.getFeatureList({
    search,
    take: 30,
    skip: 0,
  })

  return json<LoaderData>({ featureList, user, search })
}

const Route = () => {
  const { featureList, user, search } = useLoaderData<LoaderData>()

  return (
    <FeatureListPage featureList={featureList} user={user} search={search} />
  )
}

export { meta, loader }
export default Route
