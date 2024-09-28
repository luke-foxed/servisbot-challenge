import SmartToyIcon from '@mui/icons-material/SmartToy'
import ConstructionIcon from '@mui/icons-material/Construction'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'

const COMMON_STYLES = {
  borderRadius: '10px',
  height: '40px',
  width: '40px',
  padding: '5px',
  color: '#fff',
}

export const BotIcon = ({ styles = {} }) => (
  <SmartToyIcon sx={{ ...COMMON_STYLES, bgcolor: 'primary.main', ...styles }} />
)

export const WorkerIcon = ({ styles }) => (
  <ConstructionIcon
    sx={{ ...COMMON_STYLES, bgcolor: 'primary.main', ...styles }}
  />
)

export const LogIcon = ({ styles }) => (
  <TextSnippetIcon sx={{ ...COMMON_STYLES, bgcolor: 'primary.main', ...styles }} />
)
