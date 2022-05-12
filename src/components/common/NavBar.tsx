import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';

// custom imports
import PolyCodeButton from '../other/navbar/PolyCodeButton';
import NavBarButton from '../other/navbar/NavBarButton';
import { useAuth } from '../../context/useAuth';

export default function Navbar() {
  const auth = useAuth();
  const theme = useTheme();

  return (
    // nav bar main container
    <Box sx={{ flexGrow: 1, marginBottom: '5em' }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'white',
          height: '3.5em',
          justifyContent: 'center',
        }}
      >
        {/* structure container */}
        <Grid
          container
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 5fr 1fr',
          }}
        >
          {/* PolyCode button */}
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              marginLeft: { xs: 1, sm: 2, md: 4 },
            }}
          >
            <PolyCodeButton />
          </Grid>

          {/* buttons */}
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <NavBarButton name="Practices" destination="/practice" />
            <NavBarButton name="Challenges" destination="/challenge" />
            <NavBarButton name="Exercises" destination="/exercise" />
          </Grid>

          {/* space */}
          <Grid item></Grid>

          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              marginRight: { xs: 1, sm: 2, md: 4 },
            }}
          >
            {/* if user is not connected */}
            <Box
              sx={{
                display: { md: !auth.user.id ? 'flex' : 'none' },
              }}
            >
              <Link
                to="/auth/login"
                style={{
                  color: theme.palette.primary.main,
                  fontFamily: 'Arsenal',
                  fontSize: '21px',
                  textDecoration: 'none',
                }}
              >
                Login
              </Link>
            </Box>
            {/* if user is connected */}
            <Box
              sx={{
                display: { md: auth.user.id ? 'flex' : 'none' },
              }}
            >
              <Link
                to="/user/me"
                style={{
                  color: theme.palette.primary.main,
                  fontFamily: 'Arsenal',
                  fontSize: '21px',
                  textDecoration: 'none',
                }}
              >
                Account
              </Link>
            </Box>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
}
