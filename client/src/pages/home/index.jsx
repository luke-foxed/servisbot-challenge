import { Stack, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import { getStats } from '../../api/stats'
import { useNavigate } from 'react-router-dom'
import { BotIcon, LogIcon, WorkerIcon } from '../../components/common/icons'
import { StyledStack } from '../../components/common/styled_components'

const StatIcon = ({ stat }) => {
  switch (stat) {
    case 'bots':
      return <BotIcon />
    case 'workers':
      return <WorkerIcon />
    default:
      return <LogIcon />
  }
}

const StatBox = ({ stat, value, onClick }) => {
  return (
    <StyledStack
      sx={{ height: '150px', width: '250px', margin: 'auto' }}
      onClick={() => onClick(stat)}
      gap="10px"
      alignItems="center"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        width="100%"
        height="100%"
        gap="10px"
      >
        <StatIcon stat={stat} />
        <Typography variant="h4">{stat.toUpperCase()}</Typography>
      </Stack>
      <Typography variant="h3">{value}</Typography>
    </StyledStack>
  )
}

const Home = () => {
  const { data, isLoading, error } = useQuery(['stats'], getStats)
  const navigate = useNavigate()

  const handleStatClick = (stat) => {
    navigate(`/${stat}`)
  }

  const renderContent = () => {
    if (isLoading) return 'Loading...'
    if (error) return 'Loading'
  }

  return (
    <Stack height="75vh" alignItems="center" justifyContent="center" gap="40px">
      <Typography variant="h3">ServisBot Dashboard</Typography>
      <Typography variant="subtitle1">
        Welcome Back! Here are some stats on your current setup.
      </Typography>
      {data && (
        <Stack direction="row" gap="40px">
          {Object.keys(data).map((stat) => (
            <StatBox key={stat} stat={stat} value={data[stat]} onClick={handleStatClick} />
          ))}
        </Stack>
      )}
    </Stack>
  )
}

export default Home
