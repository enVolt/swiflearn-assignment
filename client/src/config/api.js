let host;

// if(process.env.NODE_ENV == "test"){
// }else{
//   host = location.origin;
// }
host = "http://localhost:3000";

const baseUri = host + "/";

export const API_CONFIG = {
  host: host,
  baseUri: baseUri,
  auth: 'auth',
  users: 'users'
};
