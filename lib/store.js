import fortune from 'fortune';
import adapter from 'fortune-seedable-memory';
import path from 'path';

const recordTypes = {
  user: {
    name: String,

    // Following and followers are inversely related (many-to-many)
    following: [Array('user'), 'followers'],
    followers: [Array('user'), 'following'],

    // Many-to-one relationship of user posts to post author
    posts: [Array('post'), 'author'],
  },

  post: {
    message: String,

    // One-to-many / many-to-one relationship of posts to replies
    'in-reply-to': ['post', 'replies'],
    replies: [Array('post'), 'in-reply-to'],

    // One-to-many relationship of post author to user posts
    author: ['user', 'posts'],
  },
};

const adapterOptions = {
  dbPath: path.resolve('db'),
};

const store = fortune(recordTypes, {
  adapter: [adapter, adapterOptions],
});

export default store;
