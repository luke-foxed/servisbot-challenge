import { useQuery } from 'react-query'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getWorkerById } from '../../api/workers'
import LogsTable from '../../components/logs_table'

const Worker = () => {
  const { id } = useParams()
  const [logsPageParams, setLogsPageParams] = useSearchParams()
  const navigate = useNavigate()
  const logsPage = logsPageParams.get('logsPage') ?? 1

  const { data: worker, isLoading, error } = useQuery(['worker', id, logsPage], () => getWorkerById(id, logsPage), { enabled: !!id })

  if (isLoading) return 'Loading'

  if (error) return error

  const handleClickLog = (logId) => {
    navigate(`/logs/${logId}`)
  }

  const handleChangeLogsPage = (newPage) => {
    setLogsPageParams({ logsPage: newPage })
  }

  return (
    <div>
      <h1>Worker</h1>
      {worker && (
        <>
          <div>{worker.name}</div>
          <LogsTable logs={worker.logs} onClickRow={handleClickLog} onChangePage={handleChangeLogsPage} />
        </>
      )}
    </div>
  )
}

export default Worker
