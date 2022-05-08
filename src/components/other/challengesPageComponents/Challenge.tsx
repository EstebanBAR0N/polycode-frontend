import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Challenge(props: any) {
  return (
    <Grid
      container
      sx={{
        display: 'grid',
        gridTemplateRows: '2fr 1fr',
        width: '100%',
        height: '100%',
        border: '1px solid #2A393E',
        backgroundColor: props.isEven ? '#2A393E' : '#FFFFFF',
      }}
    >
      {/* title + language */}
      <Grid
        item
        sx={{
          marginTop: '2.5em',
          marginLeft: '2.8em',
        }}
      >
        <Box
          sx={{
            width: '90%',
            borderBottom: `1px solid #71CE8B`,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: props.isEven ? '#FFFFFF' : 'black',
            }}
          >
            {props.name}
          </Typography>
        </Box>
        <Typography variant="h5" sx={{ marginTop: '0.8em', color: '#C771CE' }}>
          {props.language}
        </Typography>
      </Grid>
      {/* button start + language logo  */}
      <Grid
        item
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '50%',
          margin: '2.5em',
          bottom: 0,
        }}
      >
        {/* let's start button */}
        <Box
          sx={{
            width: '30%',
          }}
        >
          <Button
            component={Link}
            to={props.url}
            variant="contained"
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '45px',
              backgroundColor: props.isEven ? '#FFFFFF' : '#71CE8B',
              color: props.isEven ? 'black' : '#2A393E',
              fontSize: '22px',
            }}
          >
            Let's start
          </Button>
        </Box>
        {/* logo */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            alt="language logo"
            src={props.logo}
            srcSet={props.logo}
            sx={{
              width: '3em',
              height: '3em',
              objectFit: 'cover',
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
