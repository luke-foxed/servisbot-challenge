import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getWorkerById } from '../../api/workers'
import DataTable from '../../components/common/data_table'
import { LOG_TABLE_COLUMNS } from '../../constants'

const Worker = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { search } = useLocation()

  const { data: worker, isLoading, error } = useQuery(['worker', id, search], () => getWorkerById(id, search), { enabled: !!id })

  if (isLoading) return 'Loading'

  if (error) return error

  const handleClickLog = (logId) => {
    navigate(`/logs/${logId}`)
  }

  const actions = { onView: handleClickLog, onDelete: () => alert('delete'), onEdit: () => alert('edit') }

  return (
    <div>
      <h1>Worker</h1>
      {worker && (
        <>
          <div>{worker.name}</div>
          <DataTable data={worker.logs} actions={actions} columns={LOG_TABLE_COLUMNS} />
        </>
      )}
    </div>
  )
}

export default Worker
