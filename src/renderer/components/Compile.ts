import Axios from 'axios'

export const Compile = async (
  code: string,
  inp: string,
  out: string,
  current: string
) => {
  // console.log("code", code);
  let url = 'http://localhost:5000/'

  let data: {
    code: string
    inp: string
    out: string
    type: string
  } = {
    code,
    inp,
    out,
    type: 'cpp',
  }
  if (current.includes('.py')) data.type = 'py'
  let res = await fetch(`${url}compile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return res.json()
}
