import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getBotById } from '../../api/bots'
import DataTable from '../../components/common/data_table'
import { CircularProgress, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import Search from '../../components/common/search'
import { BotIcon } from '../../components/common/icons'
import { LOG_TABLE_COLUMNS, WORKER_TABLE_COLUMNS } from '../../constants'
import { StyledStack } from '../../components/common/styled_components'

const Bot = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { search } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const { data: bot, isLoading } = useQuery(['bot', id, search], () => getBotById(id, search), { enabled: !!id })

  const handleClickWorker = (workerId) => {
    navigate(`/workers/${workerId}`)
  }

  const handleClickLog = (logId) => {
    navigate(`/logs/${logId}`)
  }

  const handleChangeTable = (table) => {
    const currentParams = Object.fromEntries([...searchParams])
    setSearchParams({ ...currentParams, view: table, page: 1 })
  }

  const workerActions = { onView: handleClickWorker, onDelete: () => alert('delete'), onEdit: () => alert('edit') }
  const logActions = { onView: handleClickLog, onDelete: () => alert('delete'), onEdit: () => alert('edit') }

  return (
    <Stack gap="20px">
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap="10px">
          <BotIcon />
          <Typography variant="h3">
            &apos;{bot?.name?.toUpperCase() ?? ''}&apos;
          </Typography>
        </Stack>
      </Stack>

      <Stack display="grid" gap="20px" gridTemplateColumns="repeat(3, 1fr)">
        <StyledStack gap="20px">
          <Typography variant="h5">Description</Typography>
          <div>{bot?.description ?? ''}</div>
        </StyledStack>
        <StyledStack gap="20px">
          <Typography variant="h5">Status</Typography>
          <div>{bot?.status ?? ''}</div>
        </StyledStack>
        <StyledStack gap="20px">
          <Typography variant="h5">Created</Typography>
          <div>{new Date(bot?.created)?.toString() ?? ''}</div>
        </StyledStack>
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <ToggleButtonGroup
          value={searchParams.get('view') ?? 'workers'}
          exclusive
          onChange={(_, newVal) => handleChangeTable(newVal)}
        >
          <ToggleButton value="workers">Associated Workers</ToggleButton>
          <ToggleButton value="logs">Associated Logs</ToggleButton>
        </ToggleButtonGroup>

        <Search searchKey="name" />
      </Stack>

      {isLoading && <CircularProgress color="primary" />}

      {!isLoading &&
        bot &&
        (searchParams.get('view') === 'logs' ? (
          <DataTable
            data={bot.logs}
            columns={LOG_TABLE_COLUMNS}
            actions={logActions}
          />
        ) : (
          <DataTable
            data={bot.workers}
            columns={WORKER_TABLE_COLUMNS}
            actions={workerActions}
          />
        ))}
    </Stack>
  )
}

export default Bot
