export type PaginatedList<Item> = {
  items: Item[]
  total: number
}
export type PaginatedArgs = {
  take: number
  skip: number
}

export type User = {
  id: string
  email: string
  name: string
}

export type Feature = {
  id: string
  name: string
  description?: string
  enabled: boolean
  defaultEnabled: boolean
  createdAt: number
  updatedAt: number
}

export type Label = {
  name: string
  value: string
}

export type Account = {
  id: string
  name: string
  labelList: Label[]
}

export type FeatureList = PaginatedList<Feature>
export type AccountList = PaginatedList<Account>

export type GetFeatureListFn = (args: PaginatedArgs) => Promise<FeatureList>
export type GetFeatureFn = (options: { id: string }) => Promise<Feature>

export type GetAccountListFn = (args: PaginatedArgs) => Promise<AccountList>
export type GetAccountFn = (options: { id: string }) => Promise<Account>

export type GetFeatureListForAccountFn = (
  options: {
    accountId: string
  } & PaginatedArgs,
) => Promise<FeatureList>

export type GetAccountListForFeatureFn = (
  options: {
    featureId: string
    enabled: boolean
  } & PaginatedArgs,
) => Promise<AccountList>

export type FlagshipBackend = {
  getFeature: GetFeatureFn
  getFeatureList: GetFeatureListFn

  getAccount: GetAccountFn
  getAccountList: GetAccountListFn

  getFeatureListForAccount: GetFeatureListForAccountFn
  getAccountListForFeature: GetAccountListForFeatureFn
}
