const http = require('http');
const fortuneHttp = require('fortune-http');
const jsonApiSerializer = require('fortune-json-api');
const store = require('./store');

const listener = fortuneHttp(store, {
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
