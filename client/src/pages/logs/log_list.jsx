import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { Stack, Typography } from '@mui/material'
import { getLogs } from '../../api/logs'
import Search from '../../components/common/search'
import DataTable from '../../components/common/data_table'
import { LogIcon } from '../../components/common/icons'

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
    <Stack gap="20px">
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap="10px">
          <LogIcon />
          <Typography variant="h3">LOGS</Typography>
        </Stack>

        <Search searchKey="id" />
      </Stack>
      {isLoading && 'Loading...'}
      {!isLoading && !error && data && (
        <DataTable data={data} columns={LOG_COLUMNS} actions={actions} />
      )}
    </Stack>
  )
}

export default LogList
