import type { V2_MetaFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createRunnBackend } from '~/lib/runn.server'
import type { FeatureList } from '~/lib/types'
import { FeatureTable } from '~/components/feature-table'

const meta: V2_MetaFunction = () => {
  return [
    { title: 'Flagship' },
    { name: 'description', content: 'Manage Feature Flags' },
  ]
}

type LoaderData = {
  featureList: FeatureList
}

const loader: LoaderFunction = async () => {
  const backend = createRunnBackend()

  const featureList = await backend.getFeatureList({
    take: 10,
    cursor: undefined,
  })

  return json<LoaderData>({ featureList })
}

const Route = () => {
  const { featureList } = useLoaderData<LoaderData>()

  return <FeatureTable featureList={featureList} />
}

export { meta, loader }
export default Route
