import { useQuery } from 'react-query'
import { getBotById } from '../../api/bots'
import { useParams } from 'react-router-dom'

const Bot = () => {
  const { id } = useParams()
  const { data } = useQuery(['bot', id], () => getBotById(id), { enabled: !!id })

  console.log(data)

  return <h1>Bots</h1>
}

export default Bot
