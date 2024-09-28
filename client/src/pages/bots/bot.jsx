import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getBotById } from '../../api/bots'
import DataTable from '../../components/common/data_table'
import { WORKER_TABLE_COLUMNS } from '../../constants'
import { Stack } from '@mui/material'
import Search from '../../components/common/search'

const Bot = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { search } = useLocation()

  const { data: bot, isLoading, error } = useQuery(['bot', id, search], () => getBotById(id, search), { enabled: !!id })

  const handleClickWorker = (workerId) => {
    navigate(`/workers/${workerId}`)
  }

  const actions = { onView: handleClickWorker, onDelete: () => alert('delete'), onEdit: () => alert('edit') }

  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        {bot && <h1>Worker: {bot.name}</h1>}
        <Search searchKey="name" />
      </Stack>
      {!isLoading && !error && bot && (
        <DataTable
          data={bot.workers}
          columns={WORKER_TABLE_COLUMNS}
          actions={actions}
        />
      )}
    </div>
  )
}

export default Bot
