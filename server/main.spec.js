const server = require('./main.js');
const supertest = require('supertest');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

test('should accept post requests at /post', (done) => {
  supertest(HOST)
    .post('/post')
    .send({
      title: 'z1xy test',
    })
    .expect(200, done);
});
test('should write a file to disk containing post data', (done) => {
  const testFile = fs.readFileSync('content/z1xy-test.md', 'utf-8');
  expect(testFile.includes('z1xy')).toBe(true);
  done();
});
afterAll(() => {
  fs.unlinkSync('content/z1xy-test.md');
  server.close();
});
