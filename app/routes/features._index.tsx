import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createRunnBackend } from '~/lib/runn.server'
import type { FeatureList } from '~/lib/types'
import { FeatureListPage } from '~/components/page/feature-list'
import { authenticator } from '~/lib/auth.server'

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
}

const loader: LoaderFunction = async ({ request }) => {
  await authenticator.authenticate('google', request, {
    failureRedirect: '/login',
  })

  const backend = createRunnBackend()

  const pageIndex = 1
  const pageSize = 10

  const featureList = await backend.getFeatureList({
    take: pageSize,
    skip: (pageIndex - 1) * pageSize,
  })

  return json<LoaderData>({ pageIndex, pageSize, featureList })
}

const Route = () => {
  const { featureList, pageIndex, pageSize } = useLoaderData<LoaderData>()

  return (
    <FeatureListPage
      pageIndex={pageIndex}
      pageSize={pageSize}
      featureList={featureList}
    />
  )
}

export { meta, loader }
export default Route
