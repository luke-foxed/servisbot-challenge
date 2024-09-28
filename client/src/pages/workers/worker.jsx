import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getWorkerById } from '../../api/workers'
import DataTable from '../../components/common/data_table'
import { LOG_TABLE_COLUMNS } from '../../constants'
import { Stack } from '@mui/material'
import Search from '../../components/common/search'

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
    <div>
      <Stack direction="row" justifyContent="space-between">
        {worker && <h1>Worker: {worker.name}</h1>}
        <Search searchKey="id" />
      </Stack>
      {!isLoading && !error && worker && (
        <DataTable
          data={worker.logs}
          columns={LOG_TABLE_COLUMNS}
          actions={actions}
        />
      )}
    </div>
  )
}

export default Worker
