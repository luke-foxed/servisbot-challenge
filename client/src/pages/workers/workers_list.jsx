import { useQuery } from 'react-query'
import { getWorkers } from '../../api/workers'
import WorkersTable from '../../components/workers_table'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Search from '../../components/common/search'
import { Stack } from '@mui/material'

const WorkerList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { data, isLoading, error } = useQuery(['workers', search], () => getWorkers(search))

  const handleClickWorker = (workerId) => {
    navigate(`/workers/${workerId}`)
  }

  const handleChangePage = (newPage) => {
    // preserve existing URL params
    const currentParams = Object.fromEntries([...searchParams])
    setSearchParams({ ...currentParams, page: newPage })
  }

  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <h1>Workers</h1>
        <Search searchKey="name" />
      </Stack>
      {isLoading && 'Loading...'}
      {!isLoading && !error && data && (
        <WorkersTable
          workers={data}
          onClickRow={handleClickWorker}
          onChangePage={handleChangePage}
        />
      )}
    </div>
  )
}

export default WorkerList
