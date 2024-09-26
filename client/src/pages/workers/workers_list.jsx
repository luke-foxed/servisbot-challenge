import { useQuery } from 'react-query'
import { getWorkers } from '../../api/workers'
import WorkersTable from '../../components/workers_table'
import { useNavigate } from 'react-router-dom'

const WorkerList = () => {
  const { data, isLoading, error } = useQuery(['workers'], () => getWorkers())
  const navigate = useNavigate()

  if (isLoading) return 'Loading'

  if (error) return error

  const handleClickWorker = (workerId) => {
    navigate(`/workers/${workerId}`)
  }

  return (
    <div>
      <h1>Workers</h1>
      {data && <WorkersTable workers={data} onClickRow={handleClickWorker} />}
    </div>
  )
}

export default WorkerList
