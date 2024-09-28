import { useQuery } from 'react-query'
import { getWorkers } from '../../api/workers'
import { useLocation, useNavigate } from 'react-router-dom'
import Search from '../../components/common/search'
import { Stack } from '@mui/material'
import DataTable from '../../components/common/data_table'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const WORKER_COLUMNS = ['name', 'description', 'bot', 'created']

const WorkerList = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { data, isLoading, error } = useQuery(['workers', search], () => getWorkers(search))

  const handleClickWorker = (workerId) => {
    navigate(`/workers/${workerId}`)
  }

  const actionIcons = [
    { icon: () => <VisibilityIcon />, cb: handleClickWorker, key: 'view_worker' },
    { icon: () => <EditIcon />, cb: () => alert('not_implemented'), key: 'edit_worker' },
    { icon: () => <DeleteIcon />, cb: () => alert('not_implemented'), key: 'delete_worker' },
  ]

  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <h1>Workers</h1>
        <Search searchKey="name" />
      </Stack>
      {isLoading && 'Loading...'}
      {!isLoading && !error && data && (
        <DataTable data={data} columns={WORKER_COLUMNS} actions={actionIcons} />
      )}
    </div>
  )
}

export default WorkerList
