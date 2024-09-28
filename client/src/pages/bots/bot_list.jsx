import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { getBots } from '../../api/bots'
import { Stack } from '@mui/material'
import Search from '../../components/common/search'
import DataTable from '../../components/common/data_table'
import { BOT_TABLE_COLUMNS } from '../../constants'

const BotList = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { data, isLoading, error } = useQuery(['bots', search], () => getBots(search))

  // the table could handle this internally but routing should only happen at the page level and not component level
  const handleClickBot = (botId) => {
    navigate(`/bots/${botId}`)
  }

  // added a few extra actions here just so the UI looks more 'complete', they aren't hooked up though
  const actions = { onView: handleClickBot, onDelete: () => alert('delete'), onEdit: () => alert('edit') }

  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <h1>Bots</h1>
        <Search searchKey="name" />
      </Stack>
      {isLoading && 'Loading...'}
      {!isLoading && !error && data && (
        <DataTable
          data={data}
          columns={BOT_TABLE_COLUMNS}
          actions={actions}
        />
      )}
    </div>
  )
}

export default BotList
