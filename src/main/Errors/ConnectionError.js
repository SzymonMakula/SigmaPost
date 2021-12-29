class ConnectionError extends Error {
  constructor(...params) {
    super(...params);
    this.name = 'Connection Error';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConnectionError);
    }
  }
}

export default ConnectionError;
