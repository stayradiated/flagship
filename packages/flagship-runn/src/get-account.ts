import type { GetAccountFn } from '@stayradiated/flagship-core'
import { fetchGraphQL } from './fetch-graphql.js'
import type {
  FlagshipGetAccountQuery as Query,
  FlagshipGetAccountQueryVariables as Variables,
} from './graphql.generated.js'

const getAccount: GetAccountFn = async ({ id }) => {
  const data = await fetchGraphQL<Query, Variables>(
    /* GraphQL */
    `
      query FlagshipGetAccount($accountId: Int!) {
        accounts_by_pk(id: $accountId) {
          id
          name
          account_type
          size
        }
      }
    `,
    {
      accountId: Number.parseInt(id, 10),
    },
  )

  const account = data.accounts_by_pk
  if (!account) {
    throw new Error(`Account not found: ${id}`)
  }

  return {
    id: String(account.id),
    name: account.name ?? '',
    labelList: [
      {
        name: 'type',
        value: account.account_type,
      },
      typeof account.size === 'string'
        ? {
            name: 'size',
            value: account.size,
          }
        : [],
    ].flat(),
  }
}

export { getAccount }
