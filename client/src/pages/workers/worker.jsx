import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getWorkerById } from '../../api/workers'
import LogsTable from '../../components/logs_table'

const Worker = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: worker, isLoading, error } = useQuery(['worker', id], () => getWorkerById(id), { enabled: !!id })

  if (isLoading) return 'Loading'

  if (error) return error

  const handleClickLog = (logId) => {
    navigate(`/logs/${logId}`)
  }

  return (
    <div>
      <h1>Worker</h1>
      {worker && (
        <>
          <div>{worker.name}</div>
          <LogsTable logs={worker.logs} onClickRow={handleClickLog} />
        </>
      )}
    </div>
  )
}

export default Worker
