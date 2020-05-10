import React, { useState, MouseEvent, ChangeEvent, FC } from 'react'
// import styled from 'styled-components'
import Editor from './Editor'
import { Compile } from './Compile'
import Button from './Button'
import SideNav from './SideNav'
export type StateByProps = {}

export type DispatchByProps = {}

type Porps = StateByProps & DispatchByProps

// const NewFile = styled.div`
//   position: absolute;
//   bottom: 1%;
//   margin: 5px 10px;
//   display: flex;
//   justfy-content: space-between;
//   button {
//     color: white;
//     background: rgba(52, 225, 235, 1);
//     font-size: 14px;
//     font-weight: 700;
//     margin-left: -2px;
//   }
//   input {
//     outline: none;
//     padding: 2px;
//   }
// `

// const IO = styled.div`
//   width: 18vw;
//   background-color: rgba(52, 205, 215, 1);
//   float: right;
//   textarea {
//     height: 45vh;
//     display: block;
//     border: none;
//     box-sizing: border-box;
//     width: 100%;
//     font-family: monospace;
//     resize: none;
//     outline: none;
//     background-color: #1a2235;
//     color: white;

//     font-size: 16px;
//     border-radius: 5px;
//     padding: 15px;
//   }
//   div {
//     height: 3vh;
//     line-height: 3vh;
//     box-sizing: border-box;
//     padding: auto 0;
//     text-align: center;
//     font-weight: 600;
//     color: white;
//   }
//   button {
//     position: relative;
//     display: block;
//     font-size: 16px;
//     text-align: center;
//     margin: 0 auto;
//     margin-top: 5px;
//     padding: 20px auto;
//     outline: none;
//     background-color: rgba(0, 0, 0, 0.8);
//     color: white;
//     animation: all 2s ease-out;
//     cursor: pointer;
//     border-radius: 5px;
//     font-weight: 600;
//     :hover {
//       transform: translate(0%, 5%);
//     }
//     :disabled {
//       cursor: progress;
//       background-color: grey;
//     }
//   }
// `

const Files: {
  [key: string]: string
} = {
  'App.cpp':
    "#include<iostream> \n using namespace std;    \n int main(){ \n cout<<'2'; \n return 0; \n }",
  'App.py': '#code here\nprint(3)',
}

const DialogForm: FC<Porps> = ({}) => {
  const [state, setState] = useState({
    files: Files,
    current: 'App.py',
    newFile: '',
    output: '',
    input: '',
    loading: false,
    status: 200,
  })

  const _handleOpenPath = (path: string) => {
    setState({ ...state, current: path })
  }

  const createFile = () => {
    let files = {
      ...state.files,
    }
    files[state.newFile.toString()] = ''
    // console.log("files", files);
    setState({ ...state, files, newFile: '' })
  }

  const _handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let code = e.target.value

    setState({
      ...state,
      files: {
        ...state.files,
        [state.current]: code,
      },
    })
  }

  const handelCompile = async () => {
    setState({ ...state, loading: true })
    const { current, files, input, output } = state
    const code = files[current]
    const res = await Compile(code, input, output, current)
    console.log('res', res)
    setState({ ...state, output: res.out, loading: false, status: res.status })
  }
  const handleIOChange:
    | ((event: ChangeEvent<HTMLTextAreaElement>) => void)
    | undefined = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleNewFile = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, newFile: e.target.value })
  }

  const { output, input, loading, status, files, newFile, current } = state

  const color: string = status === 200 ? 'white' : 'red'

  return (
    <div
      style={{
        display: 'flex',
        fontFamily: 'sans-serif',
        width: '100vw',
        height: '100vh',
        justifyContent: 'space-between',
      }}
    >
      <SideNav
        files={files}
        _handleOpenPath={_handleOpenPath}
        newFile={newFile}
        handleNewFile={handleNewFile}
        createFile={createFile}
      />
      {/* <div
        style={{
          width: '17vw',
          display: 'block',
          borderRight: '1px solid rgba(0, 0, 0, .08)',
          backgroundColor: '#1a2235',
          color: 'white',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'block',
          }}
        >
          {Object.keys(files).map((name) => (
            <div
              key={name}
              style={{
                fontSize: 16,
                fontWeight: 600,
                padding: '8px 24px',
                backgroundColor:
                  current === name ? 'rgba(52, 205, 215, 1)' : 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => _handleOpenPath(name)}
            >
              {name}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto', width: '100%', display: 'block' }}>
          <input
            value={newFile}
            style={{ padding: '8px 24px' }}
            onChange={}
          />
          <Button label="New" onClick={createFile} />
        </div>
      </div> */}
      <Editor value={files[current]} onValueChange={_handleValueChange} />
      <div>
        <div>Input</div>
        <textarea value={input} name="input" onChange={handleIOChange} />
        <div>Output</div>
        <textarea
          value={output}
          name="output"
          readOnly
          color={color}
          onChange={handleIOChange}
        />
        <button onClick={handelCompile} disabled={loading} type="submit">
          {loading ? 'Loading' : 'Compile'}
        </button>
      </div>
    </div>
  )
}

export default DialogForm
