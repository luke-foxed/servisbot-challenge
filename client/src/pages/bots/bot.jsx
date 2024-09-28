import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getBotById } from '../../api/bots'
import DataTable from '../../components/common/data_table'
import { WORKER_TABLE_COLUMNS } from '../../constants'

const Bot = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { search } = useLocation()

  const { data: bot, isLoading, error } = useQuery(['bot', id, search], () => getBotById(id, search), { enabled: !!id })

  if (isLoading) return 'Loading'

  if (error) return error

  const handleClickWorker = (workerId) => {
    navigate(`/workers/${workerId}`)
  }

  const actions = { onView: handleClickWorker, onDelete: () => alert('delete'), onEdit: () => alert('edit') }

  return (
    <div>
      <h1>Bot</h1>
      {bot && (
        <>
          <div>{bot.name}</div>
          <DataTable data={bot.workers} actions={actions} columns={WORKER_TABLE_COLUMNS} />
        </>
      )}
    </div>
  )
}

export default Bot
