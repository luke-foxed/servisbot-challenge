import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: 'Outfit, sans-serif',
  },
  palette: {
    primary: {
      main: '#0492cf',
    },
    secondary: {
      main: '#f50057',
    },
    bots: {
      main: '#00cac9',
    },
    workers: {
      main: '#3ec08d',
    },
    logs: {
      main: '#8a61b4',
    },
  },
})

export default theme
