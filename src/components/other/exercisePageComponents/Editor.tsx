import React from 'react';
import * as monaco from 'monaco-editor';
import Editor from '@monaco-editor/react';

export default function TextEditor(props: any) {
  function handleEditorChange(
    value: string | undefined,
    event: monaco.editor.IModelContentChangedEvent
  ) {
    props.handleEditorChange(value);
  }

  return (
    <Editor
      height="70vh"
      theme="vs-dark"
      language={props.language}
      value={props.defaultCode}
      onChange={handleEditorChange}
    />
  );
}
