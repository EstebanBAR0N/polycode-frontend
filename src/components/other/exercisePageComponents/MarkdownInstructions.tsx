/* eslint-disable */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Box from '@mui/material/Box';

export default function MarkdownInstructions(props: any) {
  return (
    <Box sx={{ marginLeft: '1em' }}>
      <ReactMarkdown children={props.instructions} />
    </Box>
  );
}
