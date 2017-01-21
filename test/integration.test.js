const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
let posts = require('./fixtures/posts');
const server = require('../server/main.js');
const parsePosts = require('../parser');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;
let parsedPosts;

function postPath(post) {
  return path.join(
    __dirname,
    `./content/${post.title.replace(/\s/g, '-').toLowerCase()}.md`
  );
}

describe('SERVER tests', () => {
  test('server should start', () => expect(typeof server.close).toBe('function'));

  test('should accept multiple post requests at /post', (done) => {
    posts.forEach((post) => {
      supertest(HOST)
      .post('/post')
      .send(post)
      .expect(200, done);
    });
  });

  test('should write a file to disk containing post data', () => {
    const testFile = fs.readFileSync(
      postPath(posts[0]),
      'utf-8'
    );
    expect(testFile.includes('Oceanside')).toBe(true);
  });

  test('should write multiple files to disk containing subsequent post data', () => {
    const testFile = fs.readFileSync(
      postPath(posts[1]),
      'utf-8'
    );
    expect(testFile.includes('Overcook')).toBe(true);
  });
});

describe('PARSER tests', () => {
  beforeAll((done) => {
  console.log('parsing posts...');
  parsePosts((data) => {
    parsedPosts = data;
    console.log('returned', parsedPosts);
    done();
  });
});
  it('will read every markdown file in ./content', () => {
    console.log('expecting...', parsedPosts);
    expect(parsedPosts .length).toBe(3);
  });
});

afterAll(() => {
  posts.forEach((post) => {
    // fs.unlinkSync(postPath(post));
  });
  server.close();
});
