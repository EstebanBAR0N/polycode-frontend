import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// custom imports
import { useAuth } from '../../context/useAuth';

export default function LandingPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user.id) {
      navigate('/home');
    }
  }, [auth]);

  return (
    <Grid
      sx={{
        display: 'grid',
        gridTemplateRows: '1fr 4fr',
        width: '100%',
        height: '100vh',
      }}
    >
      <Box>
        <Typography
          variant="h2"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            margin: '2em',
            color: '#2A393E',
            textDecoration: 'underline 1px #71CE8B',
          }}
        >
          Welcome to PolyCode
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
          width: '50%',
          height: '50vh',
          border: '1px solid #2A393E',
          backgroundColor: '#FFFFFF',
          boxShadow: '1px 2px 2px #2A393E',
        }}
      >
        <Button
          component={Link}
          to="/auth/login"
          variant="contained"
          sx={{
            width: '10em',
            height: '2.5em',
            margin: '2.5em',
            borderRadius: '45px',
            backgroundColor: '#71CE8B',
            color: '#2A393E',
            fontSize: '22px',
          }}
        >
          Sign in
        </Button>
        <Button
          component={Link}
          to="/auth/register"
          variant="contained"
          sx={{
            width: '10em',
            height: '2.5em',
            margin: '2.5em',
            borderRadius: '45px',
            backgroundColor: '#71CE8B',
            color: '#2A393E',
            fontSize: '22px',
          }}
        >
          Sign up
        </Button>
      </Box>
    </Grid>
  );
}
