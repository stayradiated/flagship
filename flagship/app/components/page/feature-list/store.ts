import { create } from 'zustand'
import {
  getInitialState,
  fetchList,
  rangeContainsPoint,
  rangeLength,
} from '@stayradiated/mandarin'
import type { Range } from '@stayradiated/mandarin'
import type { Feature, FeatureList } from '~/lib/types'

type State = ReturnType<typeof getInitialState<Feature>>

type Store = State & {
  search: string
  setSearch: (search: string) => void

  init: (featureList: FeatureList, search: string) => void
  isLoaded: (index: number) => boolean
  loadRange: (range: Range) => Promise<void>
}

const useStore = create<Store>((set, get) => ({
  ...getInitialState(),

  search: '',
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

  init(featureList: FeatureList, search: string) {
    set((state) => ({
      ...state,
      search,
      valueList: featureList.items,
      fetchedSet: new Set([[0, featureList.items.length]]),
      total: featureList.total,
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
    const { search } = get()

    await fetchList<Feature>({
      getState: () => get(),
      setState(state: State) {
        set(state)
      },
      range,
      async fetch(range) {
        const take = rangeLength(range)
        const skip = range[0]

        const response = await fetch(
          `/api/features?skip=${skip}&take=${take}&search=${search}`,
        )
        const body = await response.json()

        return {
          valueList: body.featureList.items,
          total: body.featureList.total,
        }
      },
    })
  },
}))

export { useStore }
