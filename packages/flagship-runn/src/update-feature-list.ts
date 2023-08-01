import type { UpdateFeatureFn } from '@stayradiated/flagship-core'
import { fetchGraphQL } from './fetch-graphql.js'
import type {
  FlagshipUpdateFeatureListMutation as Mutation,
  FlagshipUpdateFeatureListMutationVariables as Variables,
} from './graphql.generated.js'

const updateFeatureList: UpdateFeatureFn = async (list) => {
  const featuresAccounts = list.map((item) => ({
    account_id: Number.parseInt(item.accountId, 10),
    feature_id: item.featureId,
    enabled: item.enabled,
  }))

  await fetchGraphQL<Mutation, Variables>(
    /* GraphQL */
    `
      mutation FlagshipUpdateFeatureList(
        $featuresAccounts: [features_accounts_insert_input!]!
      ) {
        insert_features_accounts(
          objects: $featuresAccounts
          on_conflict: {
            constraint: index_features_accounts_on_account_id_and_feature_id
            update_columns: [enabled]
          }
        ) {
          affected_rows
        }
      }
    `,
    {
      featuresAccounts,
    },
  )
}

export { updateFeatureList }
