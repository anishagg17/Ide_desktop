import React, { useState, MouseEvent, ChangeEvent, FC } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Editor from "./Editor";
import { Compile } from "./Compile";
import SideNav from "./SideNav";
export type StateByProps = {};

export type DispatchByProps = {};

type Porps = StateByProps & DispatchByProps;

const Files: {
  [key: string]: string,
} = {
  "App.cpp":
    "#include<iostream> \n using namespace std;    \n int main(){ \n cout<<'2'; \n return 0; \n }",
  "App.py": "#code here\nprint(3)",
};

const DialogForm: FC<Porps> = ({}) => {
  const [state, setState] = useState({
    files: Files,
    current: "App.py",
    newFile: "",
    output: "",
    input: "",
    loading: false,
    status: 200,
  });

  const _handleOpenPath = (path: string) => {
    setState({ ...state, current: path });
  };

  const createFile = () => {
    let files = {
      ...state.files,
    };
    files[state.newFile.toString()] = "";
    // console.log("files", files);
    setState({ ...state, files, newFile: "" });
  };

  const _handleValueChange = (code: string) => {
    setState({
      ...state,
      files: {
        ...state.files,
        [state.current]: code,
      },
    });
  };

  const handelCompile = async () => {
    setState({ ...state, loading: true });
    const { current, files, input, output } = state;
    const code = files[current];
    const res = await Compile(code, input, output, current);
    console.log("res", res);
    setState({ ...state, output: res.out, loading: false, status: res.status });
  };
  const handleIOChange:
    | ((event: ChangeEvent<HTMLTextAreaElement>) => void)
    | undefined = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleNewFile = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, newFile: e.target.value });
  };

  const { output, input, loading, status, files, newFile, current } = state;

  const color: string = status === 200 ? "white" : "red";

  return (
    <div
      style={{
        display: "flex",
        fontFamily: "sans-serif",
        width: "100vw",
        height: "100vh",
        justifyContent: "space-between",
      }}
    >
      <SideNav
        files={files}
        _handleOpenPath={_handleOpenPath}
        newFile={newFile}
        handleNewFile={handleNewFile}
        createFile={createFile}
      />

      <Editor value={files[current]} onValueChange={_handleValueChange} />
      <div
        style={{
          width: "30%",
          height: "100%",
          marginRight: "5px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Input
        </Typography>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          variant="outlined"
          name="input"
          onChange={handleIOChange}
          value={input}
        />
        <Typography variant="h5" gutterBottom>
          Output
        </Typography>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          variant="outlined"
          onChange={handleIOChange}
          value={output}
          name="output"
        />
        <Button
          onClick={handelCompile}
          disabled={loading}
          color="primary"
          style={{
            width: "100%",
            margin: "5px",
          }}
        >
          {loading ? "Loading" : "Compile"}
        </Button>
      </div>
    </div>
  );
};

export default DialogForm;
