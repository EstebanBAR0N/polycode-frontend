import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import '../../../assets/styles/fonts.css';

export default function PolyCodeButton() {
  const theme = useTheme();

  return (
    // web site title
    <Box>
      <Typography
        sx={{
          fontSize: { xs: '20px', sm: '24px', md: '30px' },
          marginRight: { xs: '1em' },
        }}
      >
        <Link
          to="/home"
          style={{
            color: theme.palette.primary.main,
            fontFamily: 'Hammersmith One',
            textDecoration: 'none',
          }}
        >
          PolyCode
        </Link>
      </Typography>
    </Box>
  );
}
