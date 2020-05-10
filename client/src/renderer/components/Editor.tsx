import React, { ChangeEvent } from 'react'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

type Props = {
  value: string
  onValueChange: (event: string) => void
}

const Editor: React.FC<Props> = ({ value, onValueChange }) => {
  const onChange=(newValue:string)=> {
    onValueChange( newValue);
  }

  return (
    <AceEditor
    mode="java"
    theme="github"
    value={value}
    onChange={onChange}
    fontSize={16}
    name="UNIQUE_ID_OF_DIV"
    editorProps={{ $blockScrolling: true }}
    style={{
      width:"100%",
      height:"100%",
    }}
  />
  )
}

export default Editor
