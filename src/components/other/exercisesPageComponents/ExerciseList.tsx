import Box from '@mui/material/Box';

// custom imports
import Exercise from './Exercise';

export default function ExerciseList(props: any) {
  return (
    // horizontal user image list
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        paddingBottom: '3em',
        margin: '0 auto',
      }}
    >
      {/* exercises */}
      {props.exercises && props.exercises.length > 0 ? (
        props.exercises.map((exercise: any) => {
          return (
            <Exercise
              key={exercise.name}
              name={exercise.name}
              url={'/exercise/' + exercise.id}
            />
          );
        })
      ) : (
        <Box sx={{ width: '100%', textAlign: 'center', marginTop: '5em' }}>
          No exercise found
        </Box>
      )}
    </Box>
  );
}
