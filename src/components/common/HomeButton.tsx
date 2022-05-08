import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';

export default function HomeButton() {
  return (
    // icon and text container
    <Box sx={{ marginTop: { md: '1em' } }}>
      <Link
        href="/home"
        variant="body2"
        style={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          textDecoration: 'none',
          height: '3em',
        }}
      >
        {/* icon and text */}
        <HomeIcon />
        <span style={{ marginTop: '4px' }}>Home</span>
      </Link>
    </Box>
  );
}
