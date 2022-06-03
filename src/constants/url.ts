// export const SERVER_URL_LOCAL = 'ws://localhost:5001/';
// export const SERVER_URL = 'ws://physics-platform-server.herokuapp.com/';

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "ws://physics-platform-server.herokuapp.com/";
