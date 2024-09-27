import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import LogsTable from '../../components/logs_table'
import { getLogs } from '../../api/logs'
import { Stack } from '@mui/material'
import Search from '../../components/common/search'

const LogList = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { data, isLoading, error } = useQuery(['logs', search], () => getLogs(search))

  const handleClickLog = (logId) => {
    navigate(`/logs/${logId}`)
  }

  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <h1>Logs</h1>
        <Search searchKey="id" />
      </Stack>
      {isLoading && 'Loading...'}
      {!isLoading && !error && data && (
        <LogsTable logs={data} onClickRow={handleClickLog} />
      )}
    </div>
  )
}

export default LogList
