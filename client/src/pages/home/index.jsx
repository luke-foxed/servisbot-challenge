import { Stack, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import { getStats } from '../../api/stats'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import ConstructionIcon from '@mui/icons-material/Construction'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import { useNavigate } from 'react-router-dom'

const iconStyles = {
  borderRadius: '10px',
  height: '40px',
  width: '40px',
  padding: '5px',
  color: '#fff',
}

const StatIcon = ({ stat }) => {
  const getIconStyles = (bgColor) => ({
    ...iconStyles,
    bgcolor: bgColor, // apply specific background color based on stat
  })

  switch (stat) {
    case 'bots':
      return <SmartToyIcon sx={getIconStyles('bots.main')} />
    case 'workers':
      return <ConstructionIcon sx={getIconStyles('workers.main')} />
    default:
      return <TextSnippetIcon sx={getIconStyles('logs.main')} />
  }
}

const StatBox = ({ stat, value, onClick }) => {
  return (
    <Stack
      sx={{
        height: '125px',
        width: '250px',
        background: '#fff',
        borderRadius: '20px',
        margin: 'auto',
        padding: '10px',
        border: '4px solid',
        borderColor: `${stat}.main`,
      }}
      onClick={() => onClick(stat)}
      gap="10px"
      alignItems="center"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        width="100%"
        gap="10px"
      >
        <StatIcon stat={stat} />
        <Typography variant="h4">{stat.toUpperCase()}</Typography>
      </Stack>
      <Typography variant="h3">{value}</Typography>
    </Stack>
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
