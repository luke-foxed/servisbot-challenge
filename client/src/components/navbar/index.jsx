import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { Link, useLocation } from 'react-router-dom'
import logo from '/logo_full.png'
import { Box, Stack } from '@mui/material'

const PAGES = ['Bots', 'Workers', 'Logs']

const NavBar = () => {
  const location = useLocation()

  return (
    <div style={{ paddingBottom: '50px' }}>
      <AppBar position="static" sx={{ background: '#fff', height: '70px' }}>
        <Container maxWidth="xl" style={{ margin: 'auto' }}>
          <Toolbar disableGutters>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: '100%' }}
            >
              <Link
                to="/"
                style={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                <img src={logo} height={35} alt="Logo" />
              </Link>

              <Stack direction="row" gap="5px">
                {PAGES.map((page) => {
                  const isActive =
                    location.pathname.includes(page.toLowerCase())

                  return (
                    <Link
                      to={`/${page.toLowerCase()}`}
                      key={page}
                      style={{ textDecoration: 'none', color: 'darkgray' }}
                    >
                      <Button
                        disableRipple
                        size="large"
                        variant="text"
                        color={isActive ? 'primary' : ''}
                        sx={{ width: '100px', fontSize: '20px' }}
                      >
                        <Box sx={{ borderBottom: isActive ? '2px solid': 'none' }}>{page}</Box>
                      </Button>
                    </Link>
                  )
                })}
              </Stack>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}
export default NavBar
