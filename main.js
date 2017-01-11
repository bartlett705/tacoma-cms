const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser').json();
const server = express();
const PORT = process.env.PORT || 3000;

server.use(bodyParser);

server.post('/post', (req, res) => {
  const newPostObj = req.body;
  console.log('New post! ', newPostObj);

  // generate filename by converting title to skeletal case
  const fileToWrite = newPostObj.title.split(' ').join('-');

  // format file with template literal
  const fileContents =
`title: ${newPostObj.title}
date: ${newPostObj.date}
tags: ${newPostObj.tags}
---
${newPostObj.body}
`;
  fs.writeFile(`content/${fileToWrite}.md`, fileContents, (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  });
  res.end();
});

server.get('/posts', (req, res) => {
  console.log('got');
});

server.listen(PORT, () => {
  console.log(`Ahmad\'s blog server listening on Port ${PORT}`);
});
