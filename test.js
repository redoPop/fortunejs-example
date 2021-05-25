import { strict as assert } from 'assert';
import Kitsu from 'kitsu';
import connect from './lib/server.js';
import store from './lib/store.js';

let api, server;

before(async () => {
  server = await connect;
  api = new Kitsu({ baseURL: 'http://localhost:1337' });
});

after(() => {
  store.disconnect();
  server.close();
});

describe('/posts', function () {
  this.timeout(100);

  it('returns all posts', async () => {
    const posts = await api.get('posts');
    assert.equal(posts.data[0].message, 'Sugar peas!');
    assert.equal(posts.data[1].message, '@Catbug Drop \'em!');
    assert.equal(posts.data[2].message, '@Danny Okay!');
  });

  it('returns a single post', async () => {
    const post = await api.get('posts/1');
    assert.equal(post.data.message, 'Sugar peas!');
  });

  it('includes related authors', async () => {
    const post = await api.get('posts/1?include=author');
    assert.equal(post.data.author.data.name, 'Catbug');
  });
});

describe('/users', function () {
  this.timeout(100);

  it('returns all users', async () => {
    const users = await api.get('users');
    assert.equal(users.data[0].name, 'Chris');
    assert.equal(users.data[1].name, 'Beth');
    assert.equal(users.data[2].name, 'Wallow');
    assert.equal(users.data[3].name, 'Danny');
    assert.equal(users.data[4].name, 'Catbug');
  });

  it('returns a single user', async () => {
    const user = await api.get('users/1');
    assert.equal(user.data.name, 'Chris');
  });

  it('includes related posts', async () => {
    const user = await api.get('users/5?include=posts');
    assert.equal(user.data.posts.data[0].message, 'Sugar peas!');
  });
});
