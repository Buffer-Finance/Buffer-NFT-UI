import axiosInstance from 'Config/axios'

const paramStringGiver = (err) => {
  if (!err) {
    return -1
  }
  if (typeof err === 'string') return err
  if (typeof err === 'object') {
    return JSON.stringify(err)
  }
  return err
}

const logAPI = (err: any) => {
  const errString = paramStringGiver(err)
  if (errString === -1) return
  axiosInstance.post('/logs/?data=' + errString).catch(console.log)
}

export default logAPI
