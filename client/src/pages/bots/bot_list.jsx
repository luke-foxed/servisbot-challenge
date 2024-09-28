import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { getBots } from '../../api/bots'
import { Stack } from '@mui/material'
import Search from '../../components/common/search'
import DataTable from '../../components/common/data_table'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const BOT_COLUMNS = ['name', 'description', 'status', 'created']

const BotList = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { data, isLoading, error } = useQuery(['bots', search], () => getBots(search))

  // the table could handle this internally but routing should only happen at the page level and not component level
  const handleClickBot = (botId) => {
    navigate(`/bots/${botId}`)
  }

  // added a few extra actions here just so the UI looks more 'complete', they aren't hooked up though
  const actionIcons = [
    { icon: () => <VisibilityIcon />, cb: handleClickBot, key: 'view_bot' },
    { icon: () => <EditIcon />, cb: () => alert('not_implemented'), key: 'edit_bot' },
    { icon: () => <DeleteIcon />, cb: () => alert('not_implemented'), key: 'delete_bot' },
  ]

  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <h1>Bots</h1>
        <Search searchKey="name" />
      </Stack>
      {isLoading && 'Loading...'}
      {!isLoading && !error && data && (
        <DataTable data={data} columns={BOT_COLUMNS} actions={actionIcons} />
      )}
    </div>
  )
}

export default BotList
