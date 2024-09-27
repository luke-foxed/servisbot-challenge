import { useQuery } from 'react-query'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { getBots } from '../../api/bots'
import BotsTable from '../../components/bots_table'
import { Stack } from '@mui/material'
import Search from '../../components/common/search'

const BotList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { data, isLoading, error } = useQuery(['bots', search], () => getBots(search))

  // the table could handle this internally but routing should only happen at the page level and not component level
  const handleClickBot = (botId) => {
    navigate(`/bots/${botId}`)
  }

  const handleChangePage = (newPage) => {
    // preserve existing URL params
    const currentParams = Object.fromEntries([...searchParams])
    setSearchParams({ ...currentParams, page: newPage })
  }

  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <h1>Bots</h1>
        <Search searchKey="name" />
      </Stack>
      {isLoading && 'Loading...'}
      {!isLoading && !error && data && (
        <BotsTable
          bots={data}
          onClickRow={handleClickBot}
          onChangePage={handleChangePage}
        />
      )}
    </div>
  )
}

export default BotList
