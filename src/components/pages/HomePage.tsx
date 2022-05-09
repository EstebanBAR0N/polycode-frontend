import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// custom imports
import Navbar from '../common/NavBar';
import ExerciseList from '../other/exercisesPageComponents/ExerciseList';
import useFetch from '../../context/useFetch';
import { API_URL } from '../../utils/constants';

export default function HomePage() {
  // fetch data
  let { data: exercise, loading: loadingOne } = useFetch(
    API_URL + '/exercise',
    true
  );
  let { data: challenges, loading: loadingTwo } = useFetch(
    API_URL + '/challenge',
    true
  );

  console.log(exercise, challenges);

  // custom states
  const [exercises, setExercises] = useState([]);
  const defaultValue: any = {};
  const [challenge, setChallenge] = useState(defaultValue);

  // update exercises after fetch
  useEffect(() => {
    if (exercise) {
      setExercises(exercise);
    }
    if (challenges) {
      setChallenge(challenges[0]);
    }
  }, [exercise, challenges]);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: '3em 3fr 5fr',
        width: '100%',
        height: '100vh',
      }}
    >
      <Navbar />
      <Box
        component={Link}
        to={'/challenge/' + challenge?.id}
        sx={{
          marginBottom: '4em',
          width: '100%',
          height: '100%',
          backgroundColor: '#2A393E',
          textDecoration: 'none',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            // height: '3em',
            marginLeft: '2.5em',
            marginTop: '1.5em',
            // fontSize: '24px',
            color: '#FFFFFF',
          }}
        >
          {challenge && challenge?.name ? challenge.name : ''}
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: '-4em',
          width: '100%',
          height: '100%',
        }}
      >
        <ExerciseList exercises={exercises} />
      </Box>
    </Box>
  );
}
