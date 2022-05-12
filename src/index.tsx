import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import mainTheme from './assets/theme/mainTheme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProvideAuth } from './context/useAuth';

// set font to all pages
import './assets/styles/fonts.css';

// page imports
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import EmailConfirmationPage from './components/pages/EmailConfirmationPage';
import HomePage from './components/pages/HomePage';
import AccountPage from './components/pages/AccountPage';
import ChallengesPage from './components/pages/ChallengesPage';
import ChallengePage from './components/pages/ChallengePage';
import ExercisesPage from './components/pages/ExercisesPage';
import ExercisePage from './components/pages/ExercisePage';
import ErrorPage from './components/pages/ErrorPage';

import './assets/styles/index.css';

const theme = createTheme(mainTheme);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ProvideAuth>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="auth/register" element={<RegisterPage />} />
          <Route
            path="auth/confirm-email"
            element={<EmailConfirmationPage />}
          />
          <Route path="home" element={<HomePage />} />
          <Route path="user/me" element={<AccountPage />} />
          <Route
            path="practice"
            element={<ChallengesPage isPractice={true} />}
          />
          <Route path="challenge" element={<ChallengesPage />} />
          <Route path="challenge/*" element={<ChallengePage />} />
          <Route path="exercise" element={<ExercisesPage />} />
          <Route path="exercise/*" element={<ExercisePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    <ToastContainer />
  </ProvideAuth>
);
