import { useQuery } from 'react-query'
import { getWorkers } from '../../api/workers'

const Workers = () => {
  const { data } = useQuery(['workers'], getWorkers)

  console.log(data)

  return <h1>Workers</h1>
}

export default Workers
