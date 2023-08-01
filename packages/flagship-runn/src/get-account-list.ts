import type { GetAccountListFn } from '@stayradiated/flagship-core'
import { fetchGraphQL } from './fetch-graphql.js'
import type {
  FlagshipGetAccountListQuery as Query,
  FlagshipGetAccountListQueryVariables as Variables,
} from './graphql.generated.js'

const getAccountList: GetAccountListFn = async ({ search, take, skip }) => {
  const data = await fetchGraphQL<Query, Variables>(
    /* GraphQL */
    `
      query FlagshipGetAccountList($take: Int!, $skip: Int!, $search: String!) {
        accounts(
          where: { name: { _ilike: $search } }
          order_by: { id: asc }
          limit: $take
          offset: $skip
        ) {
          id
          name
          account_type
          size
        }
        accounts_aggregate(where: { name: { _ilike: $search } }) {
          aggregate {
            count
          }
        }
      }
    `,
    {
      take,
      skip,
      search: search ? `%${search}%` : '%',
    },
  )

  return {
    total: data.accounts_aggregate.aggregate?.count ?? 0,
    items: data.accounts.map((account: any) => ({
      id: account.id,
      name: account.name,
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
    })),
  }
}

export { getAccountList }
