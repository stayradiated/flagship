import type { FlagshipService } from '@stayradiated/flagship-core'
import { authenticateUser } from './authenticate-user.js'
import { getAccount } from './get-account.js'
import { getFeature } from './get-feature.js'
import { getAccountList } from './get-account-list.js'
import { getFeatureList } from './get-feature-list.js'
import { getFeatureListForAccount } from './get-feature-list-for-account.js'
import { getAccountListForFeature } from './get-account-list-for-feature.js'
import { updateFeatureList } from './update-feature-list.js'

const createRunnService = (): FlagshipService => {
  return {
    authenticateUser,
    getAccount,
    getFeature,
    getAccountList,
    getFeatureList,
    getFeatureListForAccount,
    getAccountListForFeature,
    updateFeatureList,
  }
}

export { createRunnService }
