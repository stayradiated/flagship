import type { GetFeatureListFn } from '@stayradiated/flagship-core'
import * as dateFns from 'date-fns'
import { fetchGraphQL } from './fetch-graphql.js'
import type {
  FlagshipGetFeatureListQuery as Query,
  FlagshipGetFeatureListQueryVariables as Variables,
} from './graphql.generated.js'

const getFeatureList: GetFeatureListFn = async ({ take, skip, search }) => {
  const data = await fetchGraphQL<Query, Variables>(
    /* GraphQL */
    `
      query FlagshipGetFeatureList($take: Int!, $skip: Int!, $search: String!) {
        features(
          where: { name: { _ilike: $search } }
          order_by: { created_at: asc }
          limit: $take
          offset: $skip
        ) {
          id
          name
          description
          enabled
          created_at
          updated_at
        }
        features_aggregate(where: { name: { _ilike: $search } }) {
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
    total: data.features_aggregate.aggregate?.count ?? 0,
    items: data.features.map((feature: any) => ({
      id: feature.id,
      name: feature.name,
      description: feature.description,
      enabled: feature.enabled,
      defaultEnabled: feature.enabled,
      createdAt: dateFns.parseISO(feature.created_at).getTime(),
      updatedAt: dateFns.parseISO(feature.updated_at).getTime(),
    })),
  }
}

export { getFeatureList }
