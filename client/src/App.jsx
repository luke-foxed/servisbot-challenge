import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import Home from './pages/home'
import NavBar from './components/navbar'
import { Bot, BotList } from './pages/bots'
import { Worker, WorkerList } from './pages/workers'
import { Log, LogList } from './pages/logs'
import theme from './theme'

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <NavBar />
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
          </Router>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
