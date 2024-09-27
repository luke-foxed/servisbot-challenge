import { useQuery } from 'react-query'
import { getWorkers } from '../../api/workers'
import WorkersTable from '../../components/workers_table'
import { useLocation, useNavigate } from 'react-router-dom'
import Search from '../../components/common/search'
import { Stack } from '@mui/material'

const WorkerList = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { data, isLoading, error } = useQuery(['workers', search], () => getWorkers(search))

  const handleClickWorker = (workerId) => {
    navigate(`/workers/${workerId}`)
  }

  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <h1>Workers</h1>
        <Search searchKey="name" />
      </Stack>
      {isLoading && 'Loading...'}
      {!isLoading && !error && data && (
        <WorkersTable workers={data} onClickRow={handleClickWorker} />
      )}
    </div>
  )
}

export default WorkerList
