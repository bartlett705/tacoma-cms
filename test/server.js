const expect = require('expect');
const server = require('../main.js');
const supertest = require('supertest');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

describe('new post tests', () => {
  it('should accept post requests at /post', done => {
    supertest(HOST)
      .post('/post')
      .send({
        title: 'z1xy test',
      })
      .expect(200, done);
  });
  it('should write a file to disk containing post data', () => {
    const testFile = fs.readFileSync('content/z1xy-test.md', 'utf-8');
    expect(testFile.includes('z1xy')).toEqual(true);
  });
  after(() => {
    fs.unlinkSync('content/z1xy-test.md');
  });
});
