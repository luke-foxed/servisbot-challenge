import { useQuery } from 'react-query'
import { getWorkers } from '../../api/workers'
import { useLocation, useNavigate } from 'react-router-dom'
import Search from '../../components/common/search'
import { CircularProgress, Stack, Typography } from '@mui/material'
import DataTable from '../../components/common/data_table'
import { WorkerIcon } from '../../components/common/icons'

const WORKER_COLUMNS = ['name', 'description', 'bot', 'created']

const WorkerList = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { data, isLoading } = useQuery(['workers', search], () => getWorkers(search))

  const handleClickWorker = (workerId) => {
    navigate(`/workers/${workerId}`)
  }

  const actions = {
    onView: handleClickWorker,
    onDelete: () => alert('delete'),
    onEdit: () => alert('edit'),
  }

  return (
    <Stack gap="20px">
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap="10px">
          <WorkerIcon />
          <Typography variant="h3">WORKERS</Typography>
        </Stack>

        <Search searchKey="name" />
      </Stack>

      {isLoading && <CircularProgress color="primary" />}

      {!isLoading && data && (
        <DataTable data={data} columns={WORKER_COLUMNS} actions={actions} />
      )}
    </Stack>
  )
}

export default WorkerList
