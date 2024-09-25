import { useQuery } from 'react-query'
import { getBots } from '../../api/bots'

const Bots = () => {
  const { data } = useQuery(['bots'], getBots)

  console.log(data)

  return <h1>Bots</h1>
}

export default Bots
