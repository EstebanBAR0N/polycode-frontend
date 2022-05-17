import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// custom imports
import { isStatusCodeInError } from '../../utils/helpers';
import { API_URL } from '../../utils/constants';

// custom imports
import { toast } from 'react-toastify';

export default function EmailConfirmationPage() {
  const location: any = useLocation();
  const navigate = useNavigate();

  // custom states
  const [inputCode, setInputCode] = useState('');

  // update inputCode
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCode(e.target.value);
  };

  // handle code confirmation
  const handleConfirmation = async () => {
    const fields = {
      email: location.state?.email,
      confirmationEmailToken: inputCode,
    };

    const result = await fetch(API_URL + '/email/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(fields),
    });

    const response = await result.json();

    if (!response.error && !isStatusCodeInError(response.statusCode)) {
      toast.success('Account confirmed successfuly', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      navigate('/auth/login');
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

  // handle resend email
  const handleResendEmail = async () => {
    // resend email
    const result = await fetch(API_URL + '/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email: location.state?.email }),
    });

    const response = await result.json();

    if (!response.error && !isStatusCodeInError(response.statusCode)) {
      toast.info('Email resend, check your inbox', {
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

  return (
    // main container
    <Box
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        width: '50%',
        height: '100vh',
      }}
    >
      <Typography variant="h2" sx={{ margin: '1em' }}>
        PolyCode email confirmation
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          width: '100%',
          border: '1px solid #2A393E',
          boxShadow: '1px 2px 2px #2A393E',
        }}
      >
        <Typography sx={{ margin: '1em' }}>
          Please, enter the code you&apos;ve received by email
        </Typography>
        <TextField
          id="standard-basic"
          label="code"
          variant="standard"
          onChange={handleChange}
          sx={{ margin: '1em' }}
        />
        <Button
          onClick={handleConfirmation}
          variant="contained"
          sx={{
            width: '15em',
            height: '2.5em',
            borderRadius: 45,
            margin: '1em',
          }}
        >
          Confirm code
        </Button>
        <Button
          onClick={handleResendEmail}
          variant="contained"
          sx={{
            width: '15em',
            height: '2.5em',
            borderRadius: 45,
            margin: '1em',
          }}
        >
          resend email
        </Button>
      </Box>
    </Box>
  );
}
