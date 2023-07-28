import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createRunnBackend } from '~/lib/runn.server'
import type { FeatureList, User } from '~/lib/types'
import { FeatureListPage } from '~/components/page/feature-list'
import { authenticator } from '~/lib/auth.server'
import { defaultPageIndex, defaultPageSize } from '~/config'

const meta: V2_MetaFunction = () => {
  return [
    { title: 'Features • Flagship' },
    { name: 'description', content: 'Manage Feature Flags' },
  ]
}

type LoaderData = {
  featureList: FeatureList
  pageIndex: number
  pageSize: number
  user: User
}

const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.authenticate('google', request, {
    failureRedirect: '/login',
  })

  const backend = createRunnBackend()

  const pageIndex = defaultPageIndex
  const pageSize = defaultPageSize

  const featureList = await backend.getFeatureList({
    take: pageSize,
    skip: (pageIndex - 1) * pageSize,
  })

  return json<LoaderData>({ pageIndex, pageSize, featureList, user })
}

const Route = () => {
  const { featureList, pageIndex, pageSize, user } = useLoaderData<LoaderData>()

  return (
    <FeatureListPage
      pageIndex={pageIndex}
      pageSize={pageSize}
      featureList={featureList}
      user={user}
    />
  )
}

export { meta, loader }
export default Route
