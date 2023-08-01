import { create } from 'zustand'
import {
  getInitialState,
  fetchList,
  rangeLength,
  rangeContainsPoint,
} from '@stayradiated/mandarin'
import type { Range } from '@stayradiated/mandarin'
import type { Account, AccountList } from '~/lib/types'

type State = ReturnType<typeof getInitialState<Account>>
type Store = State & {
  search: string

  setSearch: (search: string) => void
  init: (accountList: AccountList, seach: string) => void
  isLoaded: (index: number) => boolean
  loadRange: (range: Range) => Promise<void>
}

const useStore = create<Store>((set, get) => ({
  ...getInitialState(),

  search: '',

  init(accountList: AccountList, search: string) {
    set((state) => ({
      ...state,
      search,
      valueList: accountList.items,
      fetchedSet: new Set([[0, accountList.items.length]]),
      total: accountList.total,
    }))
  },

  setSearch(search: string) {
    const { searchParams } = new URL(window.location.href)
    searchParams.set('search', search)
    window.history.replaceState(null, '', `?${searchParams.toString()}`)

    set({
      search,
      fetchedSet: new Set(),
    })
    this.loadRange([0, 30])
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
    const { search } = get()

    await fetchList<Account>({
      getState: get,
      setState: set,
      range,
      async fetch(range) {
        const take = rangeLength(range)
        const skip = range[0]

        const response = await fetch(
          `/api/accounts?skip=${skip}&take=${take}&search=${search}`,
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
