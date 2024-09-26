import { useQuery } from 'react-query'
import { getWorkers } from '../../api/workers'

const WorkerList = () => {
  const { data } = useQuery(['workers'], () => getWorkers())

  console.log(data)

  return <h1>Workers</h1>
}

export default WorkerList
