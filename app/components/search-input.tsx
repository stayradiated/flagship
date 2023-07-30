import debounce from 'p-debounce'
import { useCallback } from 'react'
import styles from './search-input.module.css'

type SearchInputProps = {
  defaultValue?: string
  onChange: (query: string) => void
  debounceMs?: number
}

const SearchInput = (props: SearchInputProps) => {
  const { defaultValue, onChange, debounceMs = 250 } = props

  const debouncedSeach = useCallback(
    debounce((query: string) => {
      onChange(query)
    }, debounceMs),
    [],
  )

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    debouncedSeach(value)
  }

  return (
    <input
      className={styles.searchInput}
      type="search"
      name="search"
      placeholder="Search…"
      defaultValue={defaultValue}
      onChange={handleChangeSearch}
      autoComplete="off"
    />
  )
}

export { SearchInput }
