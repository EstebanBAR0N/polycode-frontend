import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/material/styles';

// const useStyles = makeStyles({
//   button: {
//     backgroundColor: '#5D55C1',
//     color: '#fff',
//     '&:hover': {
//       backgroundColor: '#757575',
//       color: '#5D55C1',
//     },
//   },
// });

export default function ErrorPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  // const classes = useStyles();

  const goToHome = () => {
    navigate('/home');
  };

  return (
    // main container
    <Grid
      item
      sx={{
        display: 'grid',
        gridTemplateRows: '4em 1fr',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      {/* title container */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100%',
          backgroundColor: 'white',
        }}
      >
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontFamily: 'Hammersmith One',
            fontSize: { xs: '30px', md: '40px' },
          }}
        >
          PolyCode
        </Typography>
      </Box>

      {/* inner page main container */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        {/* inner page secondary container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '60%',
            height: '80%',
            marginBottom: { xs: '5em', md: '8em' },
          }}
        >
          {/* image and main text container */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '6em',
            }}
          >
            {/* image */}
            <Box
              component="img"
              src="https://images.assetsdelivery.com/compings_v2/leilavi/leilavi1904/leilavi190400017.jpg"
              alt="image"
              sx={{
                height: { xs: '13em', md: '15em' },
                width: 'auto',
                minWidth: '15em',
                marginBottom: '1em',
              }}
            />
            {/* main text */}
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontFamily: 'Hammersmith One',
                fontSize: { xs: '15px', sm: '24px', md: '30px' },
              }}
            >
              Cette page est inaccessible. Désolé.
            </Typography>
          </Box>

          {/* Home button */}
          <Button
            onClick={goToHome}
            // className={useStyles.button}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '10em',
              height: '3em',
              borderRadius: '45px',
              backgroundColor: theme.palette.primary.main,
              color: 'white',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Hammersmith One',
                fontSize: { xs: '12px', md: '14px' },
              }}
            >
              Accueil
            </Typography>
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
