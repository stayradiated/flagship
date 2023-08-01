import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { zfd } from 'zod-form-data'
import { z } from 'zod'
import { createRunnBackend } from '~/lib/runn.server'
import type { AccountList } from '~/lib/types'
import { getAuthenticator } from '~/lib/auth.server'

type LoaderData = {
  accountList: AccountList
}

const $LoaderSearchParameters = zfd.formData({
  skip: zfd.numeric(z.number().int().min(0)),
  take: zfd.numeric(z.number().int().min(1).max(100)),

  search: zfd.text(z.string().optional()),
  featureId: zfd.text(z.string().optional()),
})

const loader: LoaderFunction = async ({ request }) => {
  const backend = createRunnBackend()
  const authenticator = getAuthenticator(backend)

  await authenticator.authenticate('google', request, {
    failureRedirect: '/login',
  })

  const url = new URL(request.url)
  const { take, skip, search, featureId } = $LoaderSearchParameters.parse(
    url.searchParams,
  )

  const accountList = featureId
    ? await backend.getAccountListForFeature({
        featureId,
        enabled: true,
        take,
        skip,
      })
    : await backend.getAccountList({
        search,
        take,
        skip,
      })

  return json<LoaderData>({ accountList })
}

export { loader }
