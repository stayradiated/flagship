import * as dateFns from 'date-fns'
import type { GetFeatureListForAccountFn } from '@stayradiated/flagship-core'
import { fetchGraphQL } from './fetch-graphql.js'
import type {
  FlagshipGetFeatureListForAccountQuery as Query,
  FlagshipGetFeatureListForAccountQueryVariables as Variables,
} from './graphql.generated.js'

const getFeatureListForAccount: GetFeatureListForAccountFn = async ({
  accountId,
}) => {
  const data = await fetchGraphQL<Query, Variables>(
    /* GraphQL */
    `
      query FlagshipGetFeatureListForAccount($accountId: Int!) {
        features(order_by: { created_at: asc }) {
          id
          name
          description
          enabled
          created_at
          updated_at

          features_accounts(where: { account_id: { _eq: $accountId } }) {
            enabled
            created_at
            updated_at
          }
        }
        features_aggregate {
          aggregate {
            count
          }
        }
      }
    `,
    {
      accountId: Number.parseInt(accountId, 10),
    },
  )

  return {
    total: data.features_aggregate.aggregate?.count ?? 0,
    items: data.features.map((feature: any) => {
      const featureAccount = feature.features_accounts[0]

      return {
        id: feature.id,
        name: feature.name,
        description: feature.description,
        defaultEnabled: feature.enabled,
        enabled: featureAccount ? featureAccount.enabled : feature.enabled,
        createdAt: featureAccount
          ? dateFns.parseISO(featureAccount.created_at).getTime()
          : dateFns.parseISO(feature.created_at).getTime(),
        updatedAt: featureAccount
          ? dateFns.parseISO(featureAccount.updated_at).getTime()
          : dateFns.parseISO(feature.updated_at).getTime(),
      }
    }),
  }
}

export { getFeatureListForAccount }
