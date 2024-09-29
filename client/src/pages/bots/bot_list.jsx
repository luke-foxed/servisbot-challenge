import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { getBots } from '../../api/bots'
import { CircularProgress, Stack, Typography } from '@mui/material'
import Search from '../../components/common/search'
import DataTable from '../../components/common/data_table'
import { BOT_TABLE_COLUMNS } from '../../constants'
import { BotIcon } from '../../components/common/icons'

const BotList = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { data, isLoading } = useQuery(['bots', search], () => getBots(search))

  // the table could handle this internally but routing should only happen at the page level and not component level
  const handleClickBot = (botId) => {
    navigate(`/bots/${botId}`)
  }

  // added a few extra actions here just so the UI looks more 'complete', they aren't hooked up though
  const actions = {
    onView: handleClickBot,
    onDelete: () => alert('delete'),
    onEdit: () => alert('edit'),
  }

  return (
    <Stack gap="20px">
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap="10px">
          <BotIcon />
          <Typography variant="h3">BOTS</Typography>
        </Stack>

        <Search searchKey="name" />
      </Stack>

      {isLoading && <CircularProgress color="primary" />}

      {!isLoading && data && (
        <DataTable data={data} columns={BOT_TABLE_COLUMNS} actions={actions} />
      )}
    </Stack>
  )
}

export default BotList
