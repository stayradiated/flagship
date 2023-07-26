import assert from 'node:assert'
import * as dateFns from 'date-fns'
import type { FlagshipBackend } from './types'

const createRunnBackend = (): FlagshipBackend => {
  const endpoint = process.env.RUNN_GRAPHQL_ENDPOINT
  const adminSecret = process.env.RUNN_GRAPHQL_SECRET

  assert(typeof endpoint === 'string', 'RUNN_GRAPHQL_ENDPOINT is required')
  assert(
    typeof adminSecret === 'string',
    'RUNN_GRAPHQL_ADMIN_SECRET is required',
  )

  const graphql = async (
    query: string,
    variables: Record<string, unknown> = {},
  ) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': adminSecret,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
    const body = await response.json()
    if (body.errors) {
      console.dir(body, { depth: null })
      throw new Error(JSON.stringify(body.errors))
    }

    return body
  }

  return {
    async getAccount({ id }) {
      const response = await graphql(
        `
          query ($accountId: Int!) {
            accounts_by_pk(id: $accountId) {
              id
              name
              account_type
            }
          }
        `,
        {
          accountId: id,
        },
      )

      const account = response.data.accounts_by_pk

      return {
        id: account.id,
        name: account.name,
        labelList: [
          {
            name: 'type',
            value: account.account_type,
          },
        ],
      }
    },
    async getFeature({ id }) {
      const response = await graphql(
        `
          query ($featureId: String!) {
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

      const feature = response.data.features_by_pk

      return {
        id: feature.id,
        name: feature.name,
        description: feature.description,
        enabled: feature.enabled,
        defaultEnabled: feature.enabled,
        createdAt: dateFns.parseISO(feature.created_at).getTime(),
        updatedAt: dateFns.parseISO(feature.updated_at).getTime(),
      }
    },
    async getAccountList() {
      const body = await graphql(`
        query {
          accounts(order_by: { id: asc }) {
            id
            name
            account_type
          }
        }
      `)

      return {
        total: 0,
        items: body.data.accounts.map((account: any) => ({
          id: account.id,
          name: account.name,
          labelList: [
            {
              name: 'type',
              value: account.account_type,
            },
          ],
        })),
      }
    },
    async getFeatureList() {
      const body = await graphql(`
        query {
          features(order_by: { created_at: asc }) {
            id
            name
            description
            enabled
            created_at
            updated_at
          }
        }
      `)

      return {
        total: 0,
        items: body.data.features.map((feature: any) => ({
          id: feature.id,
          name: feature.name,
          description: feature.description,
          enabled: feature.enabled,
          defaultEnabled: feature.enabled,
          createdAt: dateFns.parseISO(feature.created_at).getTime(),
          updatedAt: dateFns.parseISO(feature.updated_at).getTime(),
        })),
      }
    },
    async getFeatureAccountList({ accountId }) {
      const body = await graphql(
        `
          query ($accountId: Int!) {
            features_accounts(
              where: { account_id: { _eq: $accountId } }
              order_by: { created_at: asc }
            ) {
              feature_id
              account_id
              enabled
              created_at
              updated_at
            }
          }
        `,
        {
          accountId,
        },
      )

      return {
        total: 0,
        items: body.data.features_accounts.map((feature: any) => ({
          featureId: feature.feature_id,
          accountId: feature.account_id,
          enabled: feature.enabled,
          createdAt: dateFns.parseISO(feature.created_at).getTime(),
          updatedAt: dateFns.parseISO(feature.updated_at).getTime(),
        })),
      }
    },
    async getAccountListForFeature({ featureId, enabled }) {
      const body = await graphql(
        `
          query ($featureId: String!, $enabled: Boolean!) {
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
          }
        `,
        {
          featureId,
          enabled,
        },
      )

      return {
        total: 0,
        items: body.data.accounts.map((account: any) => ({
          id: account.id,
          name: account.name,
          labelList: [
            {
              name: 'type',
              value: account.account_type,
            },
          ],
        })),
      }
    },
  }
}

export { createRunnBackend }
