import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

// custom imports
import Navbar from '../common/NavBar';
import ProgressBar from '../other/challengePageComponents/ProgressBar';
import ExerciseList from '../other/exercisesPageComponents/ExerciseList';
import useFetch from '../../context/useFetch';
import { API_URL } from '../../utils/constants';

export default function ChallengePage() {
  const theme = useTheme();

  // fetch challenges
  const challengeId = window.location.pathname.split('/')[2];
  let { data, loading } = useFetch(API_URL + '/challenge/' + challengeId, true);
  let { data: userChallenge, loading: loadingUserChallenge } = useFetch(
    API_URL + '/challenge/progress/' + challengeId,
    true
  );

  // custom states
  const defaultChallenge: any = {};
  const [challenge, setChallenge] = useState(defaultChallenge);
  const [exercises, setExercises] = useState([]);
  const [progress, setProgress] = useState(0);

  // update instructions, loading to data fetched
  useEffect(() => {
    if (data) {
      setChallenge(data);
      setExercises(data.exercise);
    }
  }, [data]);

  useEffect(() => {
    if (userChallenge) {
      let nbOfExercises = exercises?.length || 1;
      const nbOfExercisesCompleted = userChallenge?.nbOfExerciseCompleted || 0;

      const progress = (nbOfExercisesCompleted * 100) / nbOfExercises;
      setProgress(progress);
    }
  }, [userChallenge]);

  return (
    <Box
      style={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Navbar />
      <Grid
        container
        sx={{
          display: 'grid',
          gridTemplateRows: '1fr 1fr 8fr',
          flexDirection: 'column',
          width: '95vw',
          minHeight: '90vh',
          margin: '0 auto',
        }}
      >
        <Box
          sx={{
            paddingBottom: '2em',
            borderBottom: `1px solid ${theme.palette.primary.main}`,
          }}
        >
          <Typography variant="h2">
            {challenge ? challenge?.name : 'Challenge title'}
          </Typography>
        </Box>
        <Box
          sx={{
            margin: 'auto 0',
            paddingTop: '2em',
            paddingBottom: '2em',
            borderBottom: `1px solid ${theme.palette.primary.main}`,
          }}
        >
          <Typography variant="subtitle1">Progress: {progress} % </Typography>
          <ProgressBar value={progress} />
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            marginTop: '5em',
          }}
        >
          <ExerciseList exercises={exercises} />
        </Box>
      </Grid>
    </Box>
  );
}
