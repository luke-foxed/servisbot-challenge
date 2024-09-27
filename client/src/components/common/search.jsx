import { TextField, Box, debounce } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

const Search = ({ searchKey }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value
    const currentParams = Object.fromEntries([...searchParams])
    if (newSearchTerm) {
      // if the user searches while on a further page, they may miss the results
      setSearchParams({ ...currentParams, page: 1, [searchKey]: newSearchTerm })
    } else {
      // if the search string is empty, remove that key from the searchParams
      delete currentParams[searchKey]
      setSearchParams(currentParams)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleInputChange(event)
    }
  }

  const debounceSearch = debounce(handleInputChange, 500)

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <TextField
        label="Search"
        variant="outlined"
        onChange={debounceSearch}
        onKeyDown={handleKeyPress}
      />
    </Box>
  )
}

export default Search
