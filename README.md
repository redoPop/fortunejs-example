# Example JSON API prototype using Fortune.js
[Fortune.js](https://fortune.js.org/) is handy for prototyping [JSON:API](https://jsonapi.org/) formatted APIs.

This example extends [Fortune's Getting Started guide](https://fortune.js.org/guide/) to demonstrate a simple prototype using the [JSON:API serializer](https://www.npmjs.com/package/fortune-json-api) and [seedable memory adapter](https://www.npmjs.com/package/fortune-seedable-memory).

It's a handy combination for testing and prototyping: the [.jsonl](https://jsonlines.org/) seed files (found in the `db` directory of this repo) are easy to read and edit manually, and with just a few lines of code Fortune can serialize their contents as a JSON:API.

## Installation
* `git clone https://github.com/redoPop/fortunejs-example.git`
* `cd fortunejs-example`
* `npm install`

## Running the server
```
npm start
```

The JSON:API is now available on port 1337 of your localhost.

## Example requests
To keep things simple, I've stuck with the original example presented in the Fortune.js Getting Started guide: a basic API for a Twitter-like service consisting of only `/users` and `/posts`. You'll find the schema definition in `lib/store.js`, along with some expository comments.

I've intentionally avoided transformations and other techniques introduced in Fortune's guide to focus this example on JSON:API serialization of data.

To the same end, I've also added some seed data which you'll find in the `db` directory of this repository (`db/post.jsonl`, `db/user.jsonl`).

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
