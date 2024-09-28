import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { getLogs } from '../../api/logs'
import { Stack } from '@mui/material'
import Search from '../../components/common/search'
import DataTable from '../../components/common/data_table'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const LOG_COLUMNS = ['id', 'message', 'bot', 'worker', 'created']

const LogList = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { data, isLoading, error } = useQuery(['logs', search], () => getLogs(search))

  const handleClickLog = (logId) => {
    navigate(`/logs/${logId}`)
  }

  const actionIcons = [
    { icon: () => <VisibilityIcon />, cb: handleClickLog, key: 'view_log' },
    { icon: () => <EditIcon />, cb: () => alert('not_implemented'), key: 'edit_log' },
    { icon: () => <DeleteIcon />, cb: () => alert('not_implemented'), key: 'delete_log' },
  ]

  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <h1>Logs</h1>
        <Search searchKey="id" />
      </Stack>
      {isLoading && 'Loading...'}
      {!isLoading && !error && data && (
        <DataTable data={data} columns={LOG_COLUMNS} actions={actionIcons} />
      )}
    </div>
  )
}

export default LogList
