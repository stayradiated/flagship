import type { GetAccountListForFeatureFn } from '@stayradiated/flagship-core'
import { fetchGraphQL } from './fetch-graphql.js'
import type {
  FlagshipGetAccountListForFeatureQuery as Query,
  FlagshipGetAccountListForFeatureQueryVariables as Variables,
} from './graphql.generated.js'

const getAccountListForFeature: GetAccountListForFeatureFn = async ({
  featureId,
  enabled,
}) => {
  const data = await fetchGraphQL<Query, Variables>(
    /* GraphQL */
    `
      query FlagshipGetAccountListForFeature(
        $featureId: String!
        $enabled: Boolean!
      ) {
        accounts(
          where: {
            features_accounts: {
              feature_id: { _eq: $featureId }
              enabled: { _eq: $enabled }
            }
          }
          order_by: { id: asc }
        ) {
          id
          name
          account_type
        }
        accounts_aggregate(
          where: {
            features_accounts: {
              feature_id: { _eq: $featureId }
              enabled: { _eq: $enabled }
            }
          }
        ) {
          aggregate {
            count
          }
        }
      }
    `,
    {
      featureId,
      enabled,
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

export { getAccountListForFeature }
