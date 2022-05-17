import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';

// custom imports
import Navbar from '../common/NavBar';
import useFetch from '../../context/useFetch';
import { useAuth } from '../../context/useAuth';
import { API_URL } from '../../utils/constants';
import { isStatusCodeInError } from '../../utils/helpers';
import { getToken } from '../../utils/helpers';

export default function AccountPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  // fetch me
  let { data, loading } = useFetch(API_URL + '/user/' + auth.user?.id, true);

  // custom states
  const defaultValue: any = {};
  const [userData, setUserData] = useState(defaultValue);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // update userData
  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  // update form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle save
  const handleSave = async (event: any) => {
    event.preventDefault();

    // set Fields
    const fields = {
      username: formData['username'].substring(0, 20),
      email: formData['email'],
      password: formData['password'],
      confirmPassword: formData['confirmPassword'],
    };

    // get only filled fields
    let dataToUpdate: any = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value) {
        dataToUpdate[key] = value;
      }
    }

    // get token
    const token = getToken();

    // envoi de la requête au serveur
    const result = await fetch(API_URL + '/user/' + userData.id, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(dataToUpdate),
    });

    // recupération de la réponse
    const response = await result.json();

    // redirection sur la page d'authentification si user bien créé
    if (!response.error && !isStatusCodeInError(response.statusCode)) {
      toast.success('Account updated successfuly', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
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
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  const handleLogout = async () => {
    // get token
    const token = getToken();

    // disconnect user
    await auth.logout();

    // delete token in db
    await fetch(API_URL + '/auth/logout', {
      method: 'DELETE',
      headers: {
        authorization: 'Bearer ' + token,
      },
    });

    // redirection to landing page
    navigate('/');
  };

  const handleDeleteAccount = async (event: any) => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      event.preventDefault();

      // get token
      const token = getToken();

      // envoi de la requête au serveur
      const result: Response = await fetch(API_URL + '/user/' + userData.id, {
        method: 'DELETE',
        headers: {
          authorization: 'Bearer ' + token,
        },
      });

      // redirection sur la page d'authentification si user bien créé
      if (!isStatusCodeInError(result.status)) {
        toast.success('Account deleted successfuly', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } else {
        toast.error(result.status, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }

      await handleLogout();
    }
  };

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: '4fr 1fr',
          margin: '0 auto',
          width: '40%',
          height: '90vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            border: '1px solid #2A393E',
            boxShadow: `1px 2px 2px #2A393E`,
          }}
        >
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', margin: '2em' }}>
              <Typography
                sx={{
                  width: '10em',
                  margin: '1em',
                }}
              >
                Username
              </Typography>
              <TextField
                onChange={handleChange}
                autoComplete="given-name"
                name="username"
                id="username"
                label={userData.username}
                sx={{ width: '20em' }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', margin: '2em' }}>
              <Typography
                sx={{
                  width: '10em',
                  margin: '1em',
                }}
              >
                Email
              </Typography>
              <TextField
                onChange={handleChange}
                id="email"
                name="email"
                autoComplete="email"
                label={userData.email}
                sx={{ width: '20em' }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', margin: '2em' }}>
              <Typography
                sx={{
                  width: '10em',
                  margin: '1em',
                }}
              >
                Password
              </Typography>
              <TextField
                onChange={handleChange}
                name="password"
                type="password"
                id="password"
                label="Change password"
                autoComplete="new-password"
                sx={{ width: '20em' }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', margin: '2em' }}>
              <Typography
                sx={{
                  width: '10em',
                  margin: '1em',
                }}
              >
                Confirm password
              </Typography>
              <TextField
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                label="Confirme password"
                autoComplete="new-password"
                sx={{ width: '20em' }}
              />
            </Box>
          </Box>
          {/* submit button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              width: '100%',
              marginRight: '2em',
              marginBottom: '1em',
            }}
          >
            <Button
              type="submit"
              onClick={handleSave}
              variant="contained"
              sx={{ width: '8em', height: '2.5em', borderRadius: 45 }}
            >
              Save
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            onClick={handleLogout}
            variant="contained"
            sx={{
              width: '10em',
              height: '2em',
              borderRadius: '45px',
              backgroundColor: '#DF4B45',
              color: '#FFFFFF',
              fontSize: '22px',
              margin: '1em',
            }}
          >
            Logout
          </Button>
          <Button
            onClick={handleDeleteAccount}
            variant="contained"
            sx={{
              width: '12em',
              height: '2em',
              borderRadius: '45px',
              backgroundColor: '#DF4B45',
              color: '#FFFFFF',
              fontSize: '22px',
              margin: '0.5em',
            }}
          >
            Delete account
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
