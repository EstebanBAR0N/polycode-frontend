import Box from '@mui/material/Box';

// custom imports
import Challenge from './Challenge';

export default function ChallengeList(props: any) {
  return (
    // horizontal user image list
    <Box
      sx={{
        width: '100%',
        paddingBottom: '3em',
      }}
    >
      {/* challenges */}
      {props.challenges && props.challenges.length > 0 ? (
        props.challenges.map((challenge: any, index: number) => {
          return (
            <Challenge
              key={challenge.name}
              name={challenge.name}
              language={challenge.language}
              url={'/challenge/' + challenge.id}
              logo="../../../assets/languages_logo/js.png"
              isEven={index % 2 === 0}
            />
          );
        })
      ) : (
        <Box
          sx={{
            marginTop: '5em',
            textAlign: 'center',
          }}
        >
          No data found
        </Box>
      )}
    </Box>
  );
}
