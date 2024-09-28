import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getBotById } from '../../api/bots'
import DataTable from '../../components/common/data_table'
import { Stack, Typography } from '@mui/material'
import Search from '../../components/common/search'
import { BotIcon } from '../../components/common/icons'
import { WORKER_TABLE_COLUMNS } from '../../constants'
import { StyledStack } from '../../components/common/styled_components'

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
    <Stack gap="20px">
      <Stack direction="row" justifyContent="space-between">
        {bot && (
          <Stack direction="row" alignItems="center" gap="10px">
            <BotIcon />
            <Typography variant="h3">
              &apos;{bot.name.toUpperCase()}&apos;
            </Typography>
          </Stack>
        )}
      </Stack>

      {bot && (
        <StyledStack direction="row" justifyContent="space-evenly">
          <Typography variant="p">
            <strong>Description:</strong> {bot.description}
          </Typography>
          <Typography variant="p">
            <strong>Status:</strong> {bot.status}
          </Typography>
          <Typography variant="p">
            <strong>Created:</strong> {new Date(bot.created).toString()}
          </Typography>
        </StyledStack>
      )}

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Associated Workers</Typography>
        <Search searchKey="name" />
      </Stack>

      {!isLoading && !error && bot && (
        <DataTable
          data={bot.workers}
          columns={WORKER_TABLE_COLUMNS}
          actions={actions}
        />
      )}
    </Stack>
  )
}

export default Bot
