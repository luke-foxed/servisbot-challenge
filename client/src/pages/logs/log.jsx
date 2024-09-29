import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import ReactJson from 'react-json-view'
import { CircularProgress, Stack, Typography } from '@mui/material'
import { getLogById } from '../../api/logs'
import { LogIcon } from '../../components/common/icons'
import { StyledStack } from '../../components/common/styled_components'

const Log = () => {
  const { id } = useParams()
  const { data: log, isLoading } = useQuery(['log', id], () => getLogById(id), { enabled: !!id })

  return (
    <Stack gap="20px">
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap="10px">
          <LogIcon />
          <Typography variant="h3">
            &apos;{log?.id?.toUpperCase() ?? ''}&apos;
          </Typography>
        </Stack>
      </Stack>

      {isLoading && <CircularProgress color="primary" />}

      {log && (
        <>
          <StyledStack gap="20px">
            <Typography variant="h5">Message</Typography>
            <div style={{ wordWrap: 'break-word' }}>{log.message}</div>
          </StyledStack>
          <Stack display="grid" gap="20px" gridTemplateColumns="repeat(3, 1fr)">
            <StyledStack gap="20px">
              <Typography variant="h5">Created</Typography>
              <div>{new Date(log.created).toString()}</div>
            </StyledStack>
            <StyledStack gap="20px">
              <Typography variant="h5">Bot</Typography>
              <div>{log.bot}</div>
            </StyledStack>
            <StyledStack gap="20px">
              <Typography variant="h5">Worker</Typography>
              <div>{log.worker}</div>
            </StyledStack>
          </Stack>

          <StyledStack gap="20px">
            <Typography variant="h5">Raw Log</Typography>
            <ReactJson
              src={log}
              style={{ whiteSpace: 'nowrap', overflow: 'scroll' }}
            />
          </StyledStack>
        </>
      )}
    </Stack>
  )
}

export default Log
