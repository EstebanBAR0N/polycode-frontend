import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { toast } from 'react-toastify';
// import FormHelperText from '@mui/material/FormHelperText';

// custom imports
import { API_URL } from '../../utils/constants';
import { isStatusCodeInError } from '../../utils/helpers';
import HomeButton from '../common/HomeButton';

export default function RegisterPage() {
  // const theme = useTheme();
  const navigate = useNavigate();

  // init states
  // const [fieldsInError, setFieldsInError] = useState(false);
  // const [allFieldFilled, setAllFieldFilled] = useState(true);
  // const [samePasswords, setSamePasswords] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  let fields = {};

  // retourne Vrai si les mots de passe sont identiques
  // function areSamePasswords(password: string, confirmPassword: string) {
  //   return password === confirmPassword;
  // }

  // redirection sur la page login
  function goToEmailConfirmationPage(email: string) {
    const params: any = { state: { email: email } };
    navigate('/auth/confirm-email', params);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // set Fields
    fields = {
      username: formData['username'].substring(0, 20),
      email: formData['email'],
      password: formData['password'],
      confirmPassword: formData['confirmPassword'],
    };

    // const checkFields = {
    //   username: username,
    //   email: data.get('email'),
    //   password: data.get('password'),
    //   confirmPassword: data.get('confirmPassword'),
    // };

    // vérification des informations
    // if (!helpers.allFieldsAreFilledIn(checkFields)) {
    //   setAllFieldFilled(false);
    //   setFieldsInError(true);
    //   return;
    // }

    // const confirmPassword = data.get('confirmPassword');
    // if (!areSamePasswords(fields['password'], confirmPassword)) {
    //   setAllFieldFilled(true);
    //   setSamePasswords(false);
    //   setFieldsInError(true);
    //   return;
    // }

    // if (corruptedField()) {
    //   setAllFieldFilled(true);
    //   setSamePasswords(true);
    //   setFieldsInError(true);
    //   return;
    // }

    // setFieldsInError(false);

    // envoi de la requête au serveur

    const result = await fetch(API_URL + '/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(fields),
    });

    // recupération de la réponse
    const response = await result.json();

    // redirection sur la page d'authentification si user bien créé
    if (!response.error && !isStatusCodeInError(response.statusCode)) {
      goToEmailConfirmationPage(formData['email']);
      toast.success('Votre compte a bien été créé', {
        position: 'top-right',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } else {
      const errorMessage = response.error || response.message;
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  return (
    // main container
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <CssBaseline />

      {/* back to home button */}
      <HomeButton />

      {/* content container */}
      <Box
        sx={{
          marginTop: { xs: 2, md: 10 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* lockout icon */}
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        {/* title */}
        <Typography component="h1" variant="h5">
          Inscrivez-vous
        </Typography>
        {/* form container */}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="Nom d'utilisateur"
                autoFocus
                onChange={handleChange}
                // error={fieldsInError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Adresse mail"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                // error={fieldsInError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
                // error={fieldsInError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirmer le mot de passe"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                onChange={handleChange}
                // error={fieldsInError}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name="COPPA" />}
                label="I am 13 years of age or older"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <FormControlLabel
                control={<Checkbox name="tos" />}
                label="I agree to the"
              />
              <Box
                sx={{
                  marginLeft: '-0.6em',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <a target="_blank" href="/terms-of-service">
                  Terms of Service
                </a>
              </Box>
            </Grid>
          </Grid>
          {/* form helper */}
          {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <FormHelperText
              sx={{
                display: fieldsInError ? 'flex' : 'none',
                color: theme.palette.RED.main,
              }}
            >
              {!allFieldFilled
                ? 'Des champs requis sont vides !'
                : !samePasswords
                ? 'Les mots de passe saisis ne sont pas identiques !'
                : "Adresse email ou nom d'utilisateur non conformes !"}
            </FormHelperText>
          </Box> */}
          {/* submit button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: 45 }}
          >
            Créer un compte
          </Button>
          {/* go to login page button */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/login" variant="body2">
                Déjà un compte? Se connecter
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
