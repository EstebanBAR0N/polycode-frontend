import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function LanguageChoiceButton(props: any) {
  const [language, setLanguage] = React.useState('javascript');

  const handleChange = (event: SelectChangeEvent) => {
    const language = event.target.value as string;
    setLanguage(language);
    props.handleLanguageChange(language);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>Language</InputLabel>
        <Select value={language} label="Language" onChange={handleChange}>
          <MenuItem value="javascript">javascript</MenuItem>
          <MenuItem value="python">python</MenuItem>
          <MenuItem value="rust">rust</MenuItem>
          <MenuItem value="java">java</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
