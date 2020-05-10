import React, { ChangeEvent } from 'react'
// import styled from 'styled-components'

type Props = {
  value: string
  onValueChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

// const IO = styled.div`
//   textarea {
//     outline: none;
//     font-family: monospace;
//     font-weight: 300;
//     background-color: #1a2235;
//     color: white;
//     height: 100vh;
//     font-size: 14px;
//     width: 65vw;
//     resize: none;
//     padding: 15px;
//     box-sizing: border-box;
//   }
// `

const Editor: React.FC<Props> = ({ value, onValueChange }) => {
  return (
    <div>
      <textarea value={value} onChange={onValueChange} />
    </div>
  )
}

export default Editor
