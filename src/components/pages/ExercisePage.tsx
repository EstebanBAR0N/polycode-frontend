import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

// custom imports
import Navbar from '../common/NavBar';
import Editor from '../singleton/Editor';
import defautCodeByLanguage from '../../utils/defaultCodeByLanguage';
import LanguageChoiceButton from '../singleton/LanguageChoiceButton';
import OutputChoice from '../singleton/OutputChoice';
import MarkdownInstructions from '../singleton/MarkdownInstructions';
import useFetch from '../../context/useFetch';
import { API_URL } from '../../utils/constants';
import { getToken } from '../../utils/helpers';

export default function ExercisePage() {
  const theme = useTheme();

  // fetch exercise data
  const exerciseId = window.location.pathname.split('/')[2];
  let { data, loading } = useFetch(API_URL + '/exercise/' + exerciseId, true);

  // custom states
  const [language, setLanguage] = useState('javascript');
  const [defaultCode, setDefaultCode] = useState(
    defautCodeByLanguage(language)
  );
  const [inputCode, setInputCode] = useState(defaultCode);
  const [instructions, setInstructions] = useState('Loading...');
  const [output, setOutput] = useState('stdout');
  const [stdout, setStdOut] = useState('');
  const [stderr, setStdErr] = useState('');

  // handle language button changes
  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    setDefaultCode(defautCodeByLanguage(language));
  };

  // handle editor changes
  const handleEditorChange = (value: string) => {
    setInputCode(value);
  };

  // handle stdout and stderr buttons click
  const handleOutputChange = (output: string) => {
    setOutput(output);
  };

  // handle run click
  const handleRun = async () => {
    // prepare request
    const token = getToken();
    const body = JSON.stringify({
      language: language,
      inputCode: inputCode,
    });

    // fetch data
    const response = await fetch(API_URL + '/exercise/run/' + exerciseId, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        authorization: 'Bearer ' + token,
      },
      body: body,
    });

    // get data response
    const data = await response.json();

    // update stdout and stderr
    if (data.result) {
      setStdOut(data.result.stdout);
      setStdErr(data.result.stderr);
    }

    // add notification if the user passed the exercise or not
    if (data.isCompleted) {
      toast.success('Bravo! You have successfuly passed the exercise', {
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
      toast.error('Wrong answer, try again!', {
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

  // update instructions, loading to data fetched
  useEffect(() => {
    if (data && data.instructions) {
      const instructions = data.instructions.replaceAll('  ', '\n');
      setInstructions(instructions);
    }
  }, [data, loading]);

  return (
    <Box style={{ backgroundColor: theme.palette.background.default }}>
      <Navbar />
      <Box
        sx={{
          marginTop: '3.5em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          sx={{
            display: { xs: 'flex', md: 'grid' },
            flexDirection: { xs: 'columns' },
            gridTemplateColumns: { md: '1fr 1fr' },
            gridGap: '25px',
            width: '93vw',
            height: '93vh',
          }}
        >
          {/* instructions part */}
          <Grid
            item
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
              boxShadow: `1px 2px 2px ${theme.palette.primary.main}`,
            }}
          >
            <MarkdownInstructions instructions={instructions} />
          </Grid>

          {/* editor part */}
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '93vh',
            }}
          >
            <Grid
              container
              sx={{
                display: 'grid',
                gridTemplateRows: '1fr 10fr 4fr',
                gridGap: '3px',
                height: '100%',
              }}
            >
              <Grid item>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <LanguageChoiceButton
                    handleLanguageChange={handleLanguageChange}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '1em',
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ height: '3em' }}
                      onClick={handleRun}
                    >
                      RUN
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                sx={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid black',
                }}
              >
                <Editor
                  language={language}
                  defaultCode={defaultCode}
                  handleEditorChange={handleEditorChange}
                />
              </Grid>
              <Grid
                item
                sx={{
                  border: `1px solid ${theme.palette.primary.main}`,
                  height: '100%',
                }}
              >
                <Box>
                  <OutputChoice handleOutputChange={handleOutputChange} />
                </Box>
                <Box sx={{ marginTop: '1.5em', marginLeft: '2px' }}>
                  <Box sx={{ display: output === 'stdout' ? 'flex' : 'none' }}>
                    {stdout}
                  </Box>
                  <Box sx={{ display: output === 'stderr' ? 'flex' : 'none' }}>
                    {stderr}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
