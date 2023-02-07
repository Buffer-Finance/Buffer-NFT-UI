export const logger = (logs) => {
  if (process.env.MODE !== 'development') return
  console.log({ logs })
}
