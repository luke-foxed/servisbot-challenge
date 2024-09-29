import { useEffect, useState, useCallback } from 'react'
import { debounce } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import { StyledTextField } from './styled_components'

const Search = ({ searchKey }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialSearchValue = searchParams.get(searchKey) || ''
  const [searchValue, setSearchValue] = useState(initialSearchValue)

  useEffect(() => {
    setSearchValue(initialSearchValue)
  }, [initialSearchValue])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchParams = useCallback(debounce((newSearchTerm) => {
    const currentParams = Object.fromEntries([...searchParams])

    if (newSearchTerm) {
      // if user searches, reset to page 1 so they don't miss the results
      setSearchParams({ ...currentParams, page: 1, [searchKey]: newSearchTerm })
    } else {
      // if search is cleared, remove the searchKey from URL params entirely
      delete currentParams[searchKey]
      setSearchParams(currentParams)
    }
  }, 500), [searchParams, searchKey, setSearchParams])

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value
    setSearchValue(newSearchTerm)
    updateSearchParams(newSearchTerm)
  }

  return (
    <StyledTextField
      sx={{ margin: 'auto 0' }}
      size="small"
      placeholder="Search items..."
      variant="outlined"
      value={searchValue}
      onChange={handleInputChange}
      InputProps={{
        startAdornment: <SearchIcon />,
      }}
    />
  )
}

export default Search
