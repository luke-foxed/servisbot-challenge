import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import BotList from './pages/bots/bot_list'
import Bot from './pages/bots/bot'
import WorkerList from './pages/workers/workers_list'
import Worker from './pages/workers/worker'
import LogList from './pages/logs/log_list'
import Log from './pages/logs/log'
import NavBar from './components/navbar'
import { ThemeProvider } from '@mui/material'
import theme from './theme'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

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
