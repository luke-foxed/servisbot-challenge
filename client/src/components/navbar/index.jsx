import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { Link, useLocation } from 'react-router-dom'
import logo from '/logo.png'
import { Stack } from '@mui/material'

const pages = ['Bots', 'Workers', 'Logs']

const NavBar = () => {
  const location = useLocation() // Get the current location

  return (
    <AppBar position="static" sx={{ background: '#fff', height: '70px' }}>
      <Container maxWidth="xl" style={{ margin: 'auto' }}>
        <Toolbar disableGutters>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Link to="/" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <img src={logo} height={30} alt="Logo" />
            </Link>

            <Stack direction="row" gap="5px">
              {pages.map((page) => {
                const isActive = location.pathname === `/${page.toLowerCase()}` // Check if the button is active

                return (
                  <Link
                    to={`/${page.toLowerCase()}`}
                    key={page}
                    style={{ textDecoration: 'none', color: '#000' }}
                  >
                    <Button
                      size="large"
                      variant="text"
                      color={isActive ? 'primary' : ''} // Use 'primary' color if active, otherwise inherit
                      sx={{ width: '100px' }}
                    >
                      {page}
                    </Button>
                  </Link>
                )
              })}
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
