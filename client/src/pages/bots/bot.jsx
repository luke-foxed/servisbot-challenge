import { useQuery } from 'react-query'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getBotById } from '../../api/bots'
import WorkersTable from '../../components/workers_table'

const Bot = () => {
  const { id } = useParams()
  const [workersPageParams, setWorkersPageParams] = useSearchParams()
  const navigate = useNavigate()
  const workersPage = workersPageParams.get('workersPage') ?? 1

  const { data: bot, isLoading, error } = useQuery(['bot', id, workersPage], () => getBotById(id, workersPage), { enabled: !!id })

  if (isLoading) return 'Loading'

  if (error) return error

  const handleClickWorker = (workerId) => {
    navigate(`/workers/${workerId}`)
  }

  const handleChangeWorkersPage = (newPage) => {
    setWorkersPageParams({ workersPage: newPage })
  }

  return (
    <div>
      <h1>Bot</h1>
      {bot && (
        <>
          <div>{bot.name}</div>
          <WorkersTable workers={bot.workers} onClickRow={handleClickWorker} onChangePage={handleChangeWorkersPage} />
        </>
      )}
    </div>
  )
}

export default Bot
