import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getBots } from '../../api/bots'
import BotsTable from '../../components/bots_table'

const BotList = () => {
  const { data, isLoading, error } = useQuery(['bots'], () => getBots())
  const navigate = useNavigate()

  if (isLoading) return 'Loading'

  if (error) return error

  // the table could handle this internally but routing should only happen at the page level and not component level
  const handleClickBot = (botId) => {
    navigate(`/bots/${botId}`)
  }

  return (
    <div>
      <h1>Bots</h1>
      {data && <BotsTable bots={data} onClickRow={handleClickBot} />}
    </div>
  )
}

export default BotList
