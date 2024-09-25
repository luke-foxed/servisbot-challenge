import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Workers from './pages/workers'
import BotList from './pages/bots/bot_list'
import Bot from './pages/bots/bot'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/bots" element={<BotList />} />
          <Route path="/bots/:id" element={<Bot />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
