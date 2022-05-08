import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// custom imports
import Navbar from '../common/NavBar';
import ChallengeList from '../other/challengesPageComponents/ChallengeList';
import useFetch from '../../context/useFetch';
import { API_URL } from '../../utils/constants';

export default function ChallengesPage(props: any) {
  const theme = useTheme();

  // custom states
  const [challenges, setChallenges] = useState([]);
  const [url, setUrl] = useState('');

  useEffect(() => {
    let url: string =
      API_URL +
      '/challenge?isPractice=' +
      (props.isPractice ? 'true' : 'false');

    setUrl(url);

    return () => {
      url = '';
    };
  }, [props]);

  // fetch challenges
  let { data, loading } = useFetch(url, true);

  // update challenges
  useEffect(() => {
    if (data) {
      setChallenges(data);
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '70%',
          margin: '0 auto',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <ChallengeList challenges={challenges} />
        </Box>
      </Box>
    </Box>
  );
}
