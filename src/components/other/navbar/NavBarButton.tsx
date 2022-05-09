import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import '../../../assets/styles/fonts.css';

export default function NavBarButton(props: any) {
  const theme = useTheme();

  return (
    // web site title
    <Box>
      <Typography
        sx={{
          fontSize: { xs: '18px', sm: '22px', md: '28px' },
          marginRight: '2em', //{ xs: '1em' },
          marginLeft: '2em',
        }}
      >
        <Link
          to={props.destination}
          style={{
            color: theme.palette.primary.main,
            fontFamily: 'Arsenal',
            fontSize: '21px',
            textDecoration: 'none',
          }}
        >
          {props.name}
        </Link>
      </Typography>
    </Box>
  );
}
