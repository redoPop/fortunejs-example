# Example JSON API prototype using Fortune.js

[Fortune.js](http://fortune.js.org) is handy for prototyping [JSON API](http://jsonapi.org/) formatted APIs. This example repository extends [Fortune's Getting Started guide](http://fortune.js.org/guide/) to demonstrate a simple API prototype using Fortune's JSON API serializer coupled with its [NeDB](https://github.com/louischatriot/nedb) adapter for file-based persistence.

I find this combination especially handy: the flat files used by NeDB (found in the `db` directory of this repo) are easy to parse and edit manually, and with just a few lines of code Fortune.js can serialize their contents as a JSON API.

## Installation

* `git clone git@github.com:redoPop/fortunejs-example.git`
* `cd fortunejs-example`
* `npm install`

## Running the server

```
node_modules/.bin/babel-node server.js
```

The JSON API is now available on port 1337 of your localhost.

## Example requests

To keep things simple, I've stuck with the original example presented in the Fortune.js Getting Started guide: a basic API for a Twitter-like service consisting of only `/users` and `/posts`. You'll find the schema definition in `store.js`, along with some expository comments.

I've intentionally avoided transformations and other techniques introduced in Fortune's guide to focus this example on JSON API serialization of file-persisted data.

To the same end, I've also added some seed data which you'll find in the `db` directory of this repository (`db/post.db`, `db/user.db`).

### Retrieve all posts

```
curl -X "GET" "http://localhost:1337/posts"
```

### Create a post

```
curl -X "POST" "http://localhost:1337/posts" \
     -H "Content-Type: application/vnd.api+json" \
     -d $'{
            "data": {
              "type": "posts",
              "attributes": {
                "message": "My name is Catbug!"
              },
              "relationships": {
                "author": {
                  "data": {"id": 5, "type": "users"}
                }
              }
            }
          }'
```
