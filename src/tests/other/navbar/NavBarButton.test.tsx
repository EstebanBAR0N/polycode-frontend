import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import NavBarButton from '../../../components/other/navbar/NavBarButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

let container: any = null;
beforeEach(() => {
  // met en place un élément DOM comme cible de rendu
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // nettoie en sortie de test
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('s’affiche avec le nom et la destination passés via les props', () => {
  act(() => {
    render(<NavBarButton name="Practice" destination="/home" />, container);
  });
  expect(container.textContent).toBe(
    <Box>
      <Typography
        sx={{
          fontSize: { xs: '18px', sm: '22px', md: '28px' },
          marginRight: '2em', //{ xs: '1em' },
          marginLeft: '2em',
        }}
      >
        <Link
          to="/home"
          style={{
            color: '#5D55C1',
            fontFamily: 'Arsenal',
            fontSize: '21px',
            textDecoration: 'none',
          }}
        >
          Practice
        </Link>
      </Typography>
    </Box>
  );
});
