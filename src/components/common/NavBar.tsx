import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { toast } from 'react-toastify';

// custom imports
import PolyCodeButton from '../singleton/PolyCodeButton';
import NavBarButton from '../singleton/NavBarButton';
import { useAuth } from '../../context/useAuth';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.DARK_GREY.main, 0.25),
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

export default function Navbar() {
  const auth = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  // const params = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = (event: Event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const deconnexion = () => {
    // déconnecter le user
    auth.logout();

    // send to backend logout
    // TODO

    //fermer le menu
    setAnchorEl(null);

    // redirection sur l'accueil
    navigate('/');
  };

  // const goToAccount = () => {
  // go to profil
  // toast.warning('Cette page est en cours de création', {
  //   position: 'top-right',
  //   autoClose: 4000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: 'colored',
  // });
  // };

  // const goToMobileMenu = () => {
  //   const previousPage = params.pathname;
  //   navigate('/MobileMenu', { state: { previousPage: previousPage } });
  // };

  // const goToMyBook = () => {
  //   const userId = auth.user.id;
  //   navigate('/user/' + userId);
  // };

  // const goToUploadPage = () => {
  //   navigate('/account/upload');
  // };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
      // onClick={goToProfil}
      >
        Profil
      </MenuItem>
      <MenuItem
      // onClick={goToMyBook}
      >
        Mon book
      </MenuItem>
      <MenuItem onClick={deconnexion}>Déconnexion</MenuItem>
    </Menu>
  );

  return (
    // nav bar main container
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          // color: theme.palette.DARK_GREY.main,
          backgroundColor: 'white',
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
            <NavBarButton
              name="Practices"
              destination="/challenge?isPractice=true"
            />
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
      {/* {renderMenu} */}
    </Box>
  );
}
