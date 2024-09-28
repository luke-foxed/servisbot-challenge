import { useQuery } from 'react-query'
import { getWorkers } from '../../api/workers'
import { useLocation, useNavigate } from 'react-router-dom'
import Search from '../../components/common/search'
import { Stack } from '@mui/material'
import DataTable from '../../components/common/data_table'

const WORKER_COLUMNS = ['name', 'description', 'bot', 'created']

const WorkerList = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { data, isLoading, error } = useQuery(['workers', search], () => getWorkers(search))

  const handleClickWorker = (workerId) => {
    navigate(`/workers/${workerId}`)
  }

  const actions = { onView: handleClickWorker, onDelete: () => alert('delete'), onEdit: () => alert('edit') }

  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <h1>Workers</h1>
        <Search searchKey="name" />
      </Stack>
      {isLoading && 'Loading...'}
      {!isLoading && !error && data && (
        <DataTable data={data} columns={WORKER_COLUMNS} actions={actions} />
      )}
    </div>
  )
}

export default WorkerList
