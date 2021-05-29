const RES = (res, status, msg, data, error) => {
  res.status(status).json(
    {
      data: data ? (typeof data === 'Array' ? data : data): undefined,
      message: msg || undefined,
      error: error ? {
        message: error.message || undefined,
        code: error.status || undefined
      } : undefined
    }
  )
  return res
}


module.exports = {
  Res: RES
}