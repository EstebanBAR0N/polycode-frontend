import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function OutputChoice(props: any) {
  const [output, setOutput] = React.useState('stdout');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newOutput: string
  ) => {
    setOutput(newOutput);
    props.handleOutputChange(newOutput);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={output}
      exclusive
      onChange={handleChange}
      sx={{ height: '1.3em' }}
    >
      <ToggleButton value="stdout">stdout</ToggleButton>
      <ToggleButton value="stderr">stderr</ToggleButton>
    </ToggleButtonGroup>
  );
}
