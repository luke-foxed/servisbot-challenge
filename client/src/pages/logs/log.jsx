import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getLogById } from '../../api/logs'

const Log = () => {
  const { id } = useParams()
  const { data: log, isLoading, error } = useQuery(['log', id], () => getLogById(id), { enabled: !!id })

  if (isLoading) return 'Loading'

  if (error) return error

  return (
    <div>
      <h1>Log</h1>
      {log && (
        <>
          <div>{log.id}</div>
        </>
      )}
    </div>
  )
}

export default Log
