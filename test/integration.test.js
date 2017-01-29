const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
const posts = require('./fixtures/posts');
const server = require('../server/main.js');
const parsePosts = require('../parser');
const moment = require('moment');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let parsedPosts;

function postPath(post) {
  const year = moment(post.date).year();
  const month = months[moment(post.date).month()];
  return path.join(
    __dirname,
    `./content/${year}/${month}/${post.title.replace(/\s/g, '-').toLowerCase()}.md`
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
  parsePosts((data) => {
    parsedPosts = data;
    done();
  });
});
  it('will read every markdown file in ./content', () => {
    expect(parsedPosts.length).toBe(3);
  });
});

afterAll(() => {
  posts.forEach((post) => {
    console.log('unlinking ', postPath(post));
    fs.unlinkSync(postPath(post));
  });
  server.close();
});
