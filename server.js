import http from 'http';
import fortune from 'fortune';
import jsonApiSerializer from 'fortune-json-api';
import store from './store';

const listener = fortune.net.http(store, {
  serializers: [
    [jsonApiSerializer],
  ],
});

const server = http.createServer(listener);
const port = 1337;

store.connect().then(() => {
  server.listen(port);

  console.log(`Server is listening on port ${port}...`);
});
