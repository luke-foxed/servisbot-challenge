import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Button, Stack, ThemeProvider, Typography } from '@mui/material'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { ErrorBoundary } from 'react-error-boundary'
import Home from './pages/home'
import NavBar from './components/navbar'
import { Bot, BotList } from './pages/bots'
import { Worker, WorkerList } from './pages/workers'
import { Log, LogList } from './pages/logs'
import theme from './theme'
import logo from '/logo.avif'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (err) =>
        enqueueSnackbar({
          variant: 'error',
          message: err?.message ?? 'Unknown Error',
        }),
    },
  },
})

const Fallback = ({ error, resetErrorBoundary }) => {
  return (
    <Stack height="50h" alignItems="center" justifyContent="center" gap="20px">
      <Typography variant="h3">Unexpected Error</Typography>
      <img src={logo} height={100} />
      <Typography variant="h5">
        {error.toString()}
      </Typography>
      <Button variant="outlined" onClick={resetErrorBoundary}>Refresh</Button>
    </Stack>
  )
}

const App = () => {
  return (

    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <NavBar />
            <ErrorBoundary FallbackComponent={Fallback}>
              <div style={{ width: '86%', margin: 'auto' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/bots" element={<BotList />} />
                  <Route path="/bots/:id" element={<Bot />} />
                  <Route path="/workers" element={<WorkerList />} />
                  <Route path="/workers/:id" element={<Worker />} />
                  <Route path="/logs" element={<LogList />} />
                  <Route path="/logs/:id" element={<Log />} />
                </Routes>
              </div>
            </ErrorBoundary>
          </Router>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>

  )
}

export default App
