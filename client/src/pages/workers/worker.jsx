import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getWorkerById } from '../../api/workers'

const Worker = () => {
  const { id } = useParams()
  const { data } = useQuery(['worker', id], () => getWorkerById(id), { enabled: !!id })

  console.log(data)

  return <h1>Worker</h1>
}

export default Worker
