import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// custom imports
import Navbar from '../common/NavBar';
import ExerciseList from '../other/exercisesPageComponents/ExerciseList';
import useFetch from '../../context/useFetch';
import { API_URL } from '../../utils/constants';

export default function ExercisesPage() {
  const theme = useTheme();

  // fetch exercises
  let { data, loading } = useFetch(API_URL + '/exercise', true);

  console.log(data);

  // custom states
  const [exercises, setExercises] = useState([]);

  // update exercises after fetch
  useEffect(() => {
    if (data) {
      setExercises(data);
    }
  }, [data]);

  return (
    <Box
      style={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Navbar />
      <Box
        sx={{
          width: '100%',
          height: '100%',
          marginTop: '5em',
        }}
      >
        <ExerciseList exercises={exercises} />
      </Box>
    </Box>
  );
}
