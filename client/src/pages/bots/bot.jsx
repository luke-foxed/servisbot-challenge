import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getBotById } from '../../api/bots'
import WorkersTable from '../../components/workers_table'

const Bot = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: bot, isLoading, error } = useQuery(['bot', id], () => getBotById(id), { enabled: !!id })

  if (isLoading) return 'Loading'

  if (error) return error

  const handleClickWorker = (workerId) => {
    navigate(`/workers/${workerId}`)
  }

  return (
    <div>
      <h1>Bot</h1>
      {bot && (
        <>
          <div>{bot.name}</div>
          <WorkersTable workers={bot.workers} onClickRow={handleClickWorker} />
        </>
      )}
    </div>
  )
}

export default Bot
