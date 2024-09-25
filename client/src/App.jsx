import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Workers from './pages/workers'
import Bots from './pages/bots'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/bots" element={<Bots />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
