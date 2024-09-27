import { TextField, Box, debounce } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

const Search = ({ searchKey }) => {
  const [, setSearchParams] = useSearchParams()

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value
    if (newSearchTerm) {
      setSearchParams({ [searchKey]: newSearchTerm })
    } else {
      setSearchParams({})
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
