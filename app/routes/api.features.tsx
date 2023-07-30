import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { zfd } from 'zod-form-data'
import { z } from 'zod'
import { createRunnBackend } from '~/lib/runn.server'
import type { FeatureList } from '~/lib/types'
import { getAuthenticator } from '~/lib/auth.server'

type LoaderData = {
  featureList: FeatureList
}

const $LoaderSearchParameters = zfd.formData({
  skip: zfd.numeric(z.number().int().min(0)),
  take: zfd.numeric(z.number().int().min(1).max(100)),

  accountId: zfd.text(z.string().optional()),
})

const loader: LoaderFunction = async ({ request }) => {
  const backend = createRunnBackend()
  const authenticator = getAuthenticator(backend)

  await authenticator.authenticate('google', request, {
    failureRedirect: '/login',
  })

  const url = new URL(request.url)
  const { take, skip, accountId } = $LoaderSearchParameters.parse(
    url.searchParams,
  )

  const featureList = accountId
    ? await backend.getFeatureListForAccount({
        accountId,
        take,
        skip,
      })
    : await backend.getFeatureList({
        take,
        skip,
      })

  return json<LoaderData>({ featureList })
}

export { loader }
