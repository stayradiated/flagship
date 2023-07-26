export type PaginatedList<Item> = {
  items: Item[]
  total: number
}
export type PaginatedArgs = {
  take: number
  cursor: string | undefined
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

export type FeatureAccount = {
  featureId: string
  accountId: string
  enabled: boolean
  createdAt: number
  updatedAt: number
}

export type FeatureList = PaginatedList<Feature>
export type AccountList = PaginatedList<Account>
export type FeatureAccountList = PaginatedList<FeatureAccount>

export type GetFeatureListFn = (args: PaginatedArgs) => Promise<FeatureList>
export type GetFeatureFn = (options: { id: string }) => Promise<Feature>

export type GetAccountListFn = (args: PaginatedArgs) => Promise<AccountList>
export type GetAccountFn = (options: { id: string }) => Promise<Account>

export type GetFeatureAccountList = (
  options: {
    accountId: string
  } & PaginatedArgs,
) => Promise<FeatureAccountList>

export type GetAccountListForFeature = (
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

  getFeatureAccountList: GetFeatureAccountList
  getAccountListForFeature: GetAccountListForFeature
}
