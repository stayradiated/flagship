import { create } from 'zustand'
import {
  getInitialState,
  fetchList,
  rangeContainsPoint,
} from '@stayradiated/mandarin'
import type { Feature, FeatureList } from '~/lib/types'

type State = ReturnType<typeof getInitialState<Feature>>

type Store = State & {
  init: (featureList: FeatureList) => void
  isLoaded: (index: number) => boolean
  loadRange: (start: number, end: number) => Promise<void>
}

const useStore = create<Store>((set, get) => ({
  ...getInitialState(),

  init(featureList: FeatureList) {
    set((state) => ({
      ...state,
      valueList: featureList.items,
      fetchedSet: new Set([[0, featureList.items.length - 1]]),
      total: featureList.total,
    }))
  },

  isLoaded(index) {
    const fetchedRangeList = [...get().fetchedSet.keys()]
    return fetchedRangeList.some((range) => rangeContainsPoint(range, index))
  },

  async loadRange(start, end) {
    await fetchList<Feature>({
      getState: () => get(),
      setState(state: State) {
        set(state)
      },
      range: [start, end],
      async fetch(range) {
        const take = range[1] - range[0] + 1
        const skip = range[0]
        const search = ''

        const response = await fetch(
          `/api/features?skip=${skip}&take=${take}&search=${search ?? ''}`,
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
