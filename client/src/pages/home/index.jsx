import { CircularProgress, Stack, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getStats } from '../../api/stats'
import { BotIcon, LogIcon, WorkerIcon } from '../../components/common/icons'
import { StyledStack } from '../../components/common/styled_components'
import logo from '/logo.avif'

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
      onClick={() => onClick(stat)}
      gap="10px"
      alignItems="center"
      sx={{ transition: 'all 0.2s ease-in-out', '&:hover': { boxShadow: '0px 0px 0px 2px #0492cf', cursor: 'pointer'  } }}
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
  const { data, isLoading } = useQuery(['stats'], getStats)
  const navigate = useNavigate()

  const handleStatClick = (stat) => {
    navigate(`/${stat}`)
  }

  return (
    <Stack height="50h" alignItems="center" justifyContent="center" gap="20px">
      <Typography variant="h3">ServisBot Dashboard</Typography>
      <img src={logo} height={100} />
      <Typography variant="subtitle1">
        Welcome Back! Here are some stats on your current setup.
      </Typography>

      {isLoading && <CircularProgress color="primary" />}

      {data && !isLoading && (
        <Stack display="grid" gap="20px" gridTemplateColumns={`repeat(${Object.keys(data)?.length ?? 0}, 1fr)`}>
          {Object.keys(data).map((stat) => (
            <StatBox key={stat} stat={stat} value={data[stat]} onClick={handleStatClick} />
          ))}
        </Stack>
      )}
    </Stack>
  )
}

export default Home
