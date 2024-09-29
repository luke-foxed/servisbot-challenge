import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { TablePagination, Box } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

const PaginateActions = ({ count, page, rowsPerPage, onPageChange }) => {
  const theme = useTheme()

  const handleFirstPageButtonClick = () => {
    onPageChange(1)
  }

  const handleBackButtonClick = () => {
    onPageChange(page)
  }

  const handleNextButtonClick = () => {
    // looks a little strange but MUI starts from page 0 whereas our API starts from page 1
    // we've already subtracted 1 from the page for MUI's sake, so the next page is now +2
    onPageChange(page + 2)
  }

  const handleLastPageButtonClick = () => {
    onPageChange(Math.max(0, Math.ceil(count / rowsPerPage)))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

const Paginator = ({ page, count }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChangePage = (newPage) => {
    const currentParams = Object.fromEntries([...searchParams])
    setSearchParams({ ...currentParams, page: newPage })
  }

  return (
    <TablePagination
      labelDisplayedRows={({ from, to, count }) =>
        `${Math.min(from, to)}–${to} of ${
          count !== -1 ? count : `more than ${to}`
        }`
      }
      count={count}
      rowsPerPage={50}
      rowsPerPageOptions={[]}
      page={page}
      onPageChange={handleChangePage}
      ActionsComponent={PaginateActions}
    />
  )
}

export default Paginator
