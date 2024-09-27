import { useQuery } from 'react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getBots } from '../../api/bots'
import BotsTable from '../../components/bots_table'

const BotList = () => {
  const [pageParams, setPageParams] = useSearchParams()
  const navigate = useNavigate()
  const page = pageParams.get('page') ?? 1
  const { data, isLoading, error } = useQuery(['bots', page], () => getBots(page))

  if (isLoading) return 'Loading'

  if (error) return error

  // the table could handle this internally but routing should only happen at the page level and not component level
  const handleClickBot = (botId) => {
    navigate(`/bots/${botId}`)
  }

  const handleChangePage = (newPage) => {
    setPageParams({ page: newPage })
  }

  return (
    <div>
      <h1>Bots</h1>
      {data && <BotsTable bots={data} onClickRow={handleClickBot}  onChangePage={handleChangePage} />}
    </div>
  )
}

export default BotList
