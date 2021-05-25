import http from 'http';
import fortuneHttp from 'fortune-http';
import jsonApiSerializer from 'fortune-json-api';
import store from './store.js';

const listener = fortuneHttp(store, {
  serializers: [
    [jsonApiSerializer],
  ],
});

const server = http.createServer(listener);
const port = 1337;

export default store.connect().then(() => {
  server.listen(port);
  console.log(`Server is listening on port ${port}...`);
  return server;
});
