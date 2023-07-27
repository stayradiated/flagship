import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { zfd } from 'zod-form-data'
import { z } from 'zod'
import { createRunnBackend } from '~/lib/runn.server'
import type { FeatureList } from '~/lib/types'
import { authenticator } from '~/lib/auth.server'

type LoaderData = {
  featureList: FeatureList
  pageIndex: number
  pageSize: number
}

const $LoaderSearchParameters = zfd.formData({
  i: zfd.numeric(z.number().int().min(1).default(1)),
  s: zfd.numeric(z.number().int().min(1).max(100).default(10)),
})

const $LoaderParameters = z.object({
  accountId: z.string(),
})

const loader: LoaderFunction = async ({ request, params }) => {
  await authenticator.authenticate('google', request, {
    failureRedirect: '/login',
  })

  const { accountId } = $LoaderParameters.parse(params)

  const url = new URL(request.url)
  const { i: pageIndex, s: pageSize } = $LoaderSearchParameters.parse(
    url.searchParams,
  )

  const backend = createRunnBackend()

  const featureList = await backend.getFeatureListForAccount({
    accountId,
    take: pageSize,
    skip: (pageIndex - 1) * pageSize,
  })

  return json<LoaderData>({ pageIndex, pageSize, featureList })
}

export { loader }
