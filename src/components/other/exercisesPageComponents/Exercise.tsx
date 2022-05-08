import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Exercise(props: any) {
  return (
    <Box
      component={Link}
      to={props.url}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '20em',
        height: '14em',
        margin: '1em',
        textDecoration: 'none',
        backgroundColor: '#AADEB6',
      }}
    >
      {/* title + language */}
      <Typography
        sx={{
          fontSize: '24px',
          color: '#2A393E',
        }}
      >
        {props.name}
      </Typography>
    </Box>
  );
}
