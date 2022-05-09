import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// custom imports
import Navbar from '../common/NavBar';

export default function AccountPage() {
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: '3fr 1fr',
          // marginTop: '-1.5em',
          margin: '0 auto',
          width: '50%',
          height: '100vh',
        }}
      >
        <Box sx={{ border: '1px solid red' }}>modify user</Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2em',
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: '10em',
              height: '2em',
              borderRadius: '45px',
              backgroundColor: '#DF4B45',
              color: '#FFFFFF',
              fontSize: '22px',
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
