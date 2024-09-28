import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getWorkerById } from '../../api/workers'
import DataTable from '../../components/common/data_table'
import { LOG_TABLE_COLUMNS } from '../../constants'
import { Stack, Typography } from '@mui/material'
import Search from '../../components/common/search'
import { WorkerIcon } from '../../components/common/icons'
import { StyledStack } from '../../components/common/styled_components'

const Worker = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { search } = useLocation()

  const { data: worker, isLoading, error } = useQuery(['worker', id, search], () => getWorkerById(id, search), { enabled: !!id })

  const handleClickLog = (logId) => {
    navigate(`/logs/${logId}`)
  }

  const actions = { onView: handleClickLog, onDelete: () => alert('delete'), onEdit: () => alert('edit') }

  return (
    <Stack gap="20px">
      <Stack direction="row" justifyContent="space-between">
        {worker && (
          <Stack direction="row" alignItems="center" gap="10px">
            <WorkerIcon />
            <Typography variant="h3">
              &apos;{worker.name.toUpperCase()}&apos;
            </Typography>
          </Stack>
        )}
      </Stack>

      {worker && (
        <StyledStack direction="row" justifyContent="space-evenly">
          <Typography variant="p">
            <strong>Name:</strong> {worker.name}
          </Typography>
          <Typography variant="p">
            <strong>Description:</strong> {worker.description}
          </Typography>
          <Typography variant="p">
            <strong>Bot:</strong> {worker.bot}
          </Typography>
          <Typography variant="p">
            <strong>Created:</strong> {new Date(worker.created).toString()}
          </Typography>
        </StyledStack>
      )}

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Associated Logs</Typography>
        <Search searchKey="id" />
      </Stack>

      {!isLoading && !error && worker && (
        <DataTable
          data={worker.logs}
          columns={LOG_TABLE_COLUMNS}
          actions={actions}
        />
      )}
    </Stack>
  )
}

export default Worker
