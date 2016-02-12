import fortune from 'fortune';
import nedbAdapter from 'fortune-nedb';
import path from 'path';

const recordTypes = {
  user: {
    name: { type: String },

    // Following and followers are inversely related (many-to-many)
    following: { link: 'user', inverse: 'followers', isArray: true },
    followers: { link: 'user', inverse: 'following', isArray: true },

    // Many-to-one relationship of user posts to post author
    posts: { link: 'post', inverse: 'author', isArray: true },
  },

  post: {
    message: { type: String },

    // One-to-many / many-to-one relationship of posts to replies
    'in-reply-to': { link: 'post', inverse: 'replies' },
    replies: { link: 'post', inverse: 'in-reply-to', isArray: true },

    // One-to-many relationship of post author to user posts
    author: { link: 'user', inverse: 'posts' },
  },
};

const adapterOptions = {
  dbPath: path.join(__dirname, 'db'),
};

const store = fortune(recordTypes, {
  adapter: [nedbAdapter, adapterOptions],
});

module.exports = store;
