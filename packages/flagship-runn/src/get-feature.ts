import * as dateFns from 'date-fns'
import type { GetFeatureFn } from '@stayradiated/flagship-core'
import { fetchGraphQL } from './fetch-graphql.js'
import type {
  FlagshipGetFeatureQuery as Query,
  FlagshipGetFeatureQueryVariables as Variables,
} from './graphql.generated.js'

const getFeature: GetFeatureFn = async ({ id }) => {
  const data = await fetchGraphQL<Query, Variables>(
    /* GraphQL */
    `
      query FlagshipGetFeature($featureId: String!) {
        features_by_pk(id: $featureId) {
          id
          name
          description
          enabled
          created_at
          updated_at
        }
      }
    `,
    {
      featureId: id,
    },
  )

  const feature = data.features_by_pk
  if (!feature) {
    throw new Error(`Feature not found: ${id}`)
  }

  return {
    id: feature.id,
    name: feature.name,
    description: feature.description ?? undefined,
    enabled: feature.enabled,
    defaultEnabled: feature.enabled,
    createdAt: dateFns.parseISO(feature.created_at).getTime(),
    updatedAt: dateFns.parseISO(feature.updated_at).getTime(),
  }
}

export { getFeature }
