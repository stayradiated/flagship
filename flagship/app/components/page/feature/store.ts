import { create } from 'zustand'
import {
  getInitialState,
  fetchList,
  rangeContainsPoint,
  rangeLength,
  type Range,
} from '@stayradiated/mandarin'
import type { Account, AccountList } from '@stayradiated/flagship-core'

type State = ReturnType<typeof getInitialState<Account>>

type Store = State & {
  featureId: string | undefined

  init: (accountList: AccountList, featureId: string) => void
  isLoaded: (index: number) => boolean
  loadRange: (range: Range) => Promise<void>
}

const useStore = create<Store>((set, get) => ({
  ...getInitialState(),

  featureId: undefined,

  init(accountList: AccountList, featureId: string) {
    set((state) => ({
      ...state,
      featureId,
      valueList: accountList.items,
      fetchedSet: new Set([[0, accountList.items.length]]),
      total: accountList.total,
    }))
  },

  isLoaded(index) {
    const fetchedRangeList = [...get().fetchedSet.keys()]
    const isFetched = fetchedRangeList.some((range) =>
      rangeContainsPoint(range, index),
    )
    if (isFetched) {
      return true
    }

    const promisedRangeList = [...get().promiseMap.keys()]
    const isPromised = promisedRangeList.some((range) =>
      rangeContainsPoint(range, index),
    )
    if (isPromised) {
      return true
    }

    return false
  },

  async loadRange(range) {
    const { featureId } = get()
    if (typeof featureId !== 'string') {
      throw new TypeError('featureId is not set')
    }

    await fetchList<Account>({
      getState: () => get(),
      setState(state: State) {
        set(state)
      },
      range,
      async fetch(range) {
        const take = rangeLength(range)
        const skip = range[0]

        const response = await fetch(
          `/api/accounts?featureId=${featureId}&skip=${skip}&take=${take}`,
        )
        const body = await response.json()

        return {
          valueList: body.accountList.items,
          total: body.accountList.total,
        }
      },
    })
  },
}))

export { useStore }
