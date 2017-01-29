const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser').json();
const moment = require('moment');
const mkdirp = require('mkdirp');

const server = express();
const PORT = process.env.PORT || 3000;
const HOST = 'http://localhost';
const CORSHOST = `${HOST}:8080`;
const CONTENT_DIR = process.env.NODE_ENV === 'TEST'
  ? path.join(__dirname, '../test/content')
  : path.join(__dirname, '../content');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  return fs.mkdirSync(dirname);
}

// CORS middleware
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', CORSHOST);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

server.use(bodyParser, allowCrossDomain);
server.post('/post', (req, res) => {
  const newPostObj = req.body;
  // console.log('New post! ', newPostObj);

  // generate filename by converting title to skeletal case
  const fileToWrite = newPostObj.title.split(' ').join('-').toLowerCase();

  // format file with template literal
  const fileContents =
`title: ${newPostObj.title}
date: ${newPostObj.date}
tags: ${newPostObj.tags}
---
${newPostObj.body}
`;
  const year = moment(newPostObj.date).year();
  const month = months[moment(newPostObj.date).month()];
  const fullSavePath = path.join(CONTENT_DIR, `${year}/${month}/${fileToWrite}.md`);
  ensureDirectoryExistence(fullSavePath);
  fs.writeFile(fullSavePath, fileContents, (err) => {
    if (err) throw err;
    // console.log('It\'s saved to', `${CONTENT_DIR}/${year}/${month}/${fileToWrite}.md`);
  });
  res.end();
});

server.get('/posts', (req, res) => {
  // console.log('got');
});

const handle = server.listen(PORT, () => {
  console.log(`Ahmad\'s blog server listening on Port ${PORT}`);
});

module.exports = handle;
