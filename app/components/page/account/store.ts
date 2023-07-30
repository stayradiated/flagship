import { create } from 'zustand'
import {
  getInitialState,
  fetchList,
  rangeContainsPoint,
  rangeLength,
} from '@stayradiated/mandarin'
import type { Feature, FeatureList } from '~/lib/types'

type State = ReturnType<typeof getInitialState<Feature>>

type Store = State & {
  accountId: string | undefined

  init: (accountList: FeatureList, accountId: string) => void
  isLoaded: (index: number) => boolean
  loadRange: (start: number, end: number) => Promise<void>
}

const useStore = create<Store>((set, get) => ({
  ...getInitialState(),

  accountId: undefined,

  init(accountList: FeatureList, accountId: string) {
    set((state) => ({
      ...state,
      accountId,
      valueList: accountList.items,
      fetchedSet: new Set([[0, accountList.items.length]]),
      total: accountList.total,
    }))
  },

  isLoaded(index) {
    const fetchedRangeList = [...get().fetchedSet.keys()]
    return fetchedRangeList.some((range) => rangeContainsPoint(range, index))
  },

  async loadRange(start, endInclusive) {
    const end = endInclusive + 1

    const { accountId } = get()
    if (typeof accountId !== 'string') {
      throw new TypeError('accountId is not set')
    }

    await fetchList<Feature>({
      getState: () => get(),
      setState(state: State) {
        set(state)
      },
      range: [start, end],
      async fetch(range) {
        const take = rangeLength(range)
        const skip = range[0]

        const response = await fetch(
          `/api/features?accountId=${accountId}&skip=${skip}&take=${take}`,
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
