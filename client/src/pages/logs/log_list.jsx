import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { getLogs } from '../../api/logs'
import { Stack } from '@mui/material'
import Search from '../../components/common/search'
import DataTable from '../../components/common/data_table'

const LOG_COLUMNS = ['id', 'message', 'bot', 'worker', 'created']

const LogList = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { data, isLoading, error } = useQuery(['logs', search], () => getLogs(search))

  const handleClickLog = (logId) => {
    navigate(`/logs/${logId}`)
  }

  const actions = { onView: handleClickLog, onDelete: () => alert('delete'), onEdit: () => alert('edit') }

  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <h1>Logs</h1>
        <Search searchKey="id" />
      </Stack>
      {isLoading && 'Loading...'}
      {!isLoading && !error && data && (
        <DataTable data={data} columns={LOG_COLUMNS} actions={actions} />
      )}
    </div>
  )
}

export default LogList
