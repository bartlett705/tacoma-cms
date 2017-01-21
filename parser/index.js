// reads all markdown files in a given directory
// and parses them into an array of post objects.

const fs = require('fs');
const path = require('path');
const moment = require('moment');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parsePosts(done) {
  const contentDir = process.env.NODE_ENV === 'TEST'
    ? path.join(__dirname, '../test/content')
    : path.join(__dirname, '../content');
  const postParser = /title: (.*)\ndate: (.*)\ntags: (.*)\n---\n([^]*)/;
  const allPosts = [];

  fs.readdir(contentDir, (err, files) => {
    console.log('READ ', contentDir, 'WITH FILES: ', files);
    files.forEach((file) => {
      console.log('file:', file);
      const fileContent = fs.readFileSync(path.join(contentDir, file),
        'utf-8');
      const postContent = postParser.exec(fileContent);
      const [, title, postedDate, tags, body] = postContent;
      const year = moment(postedDate).year();
      const month = months[moment(postedDate).month()];
      const savePath = `${year}/${month}/${file.slice(0, file.length - 3)}.html`;
      allPosts.push({
        title,
        postedDate,
        tags: tags.split(','),
        body,
        savePath,
      });
    });
    console.log('returning allPosts', allPosts);
    done(allPosts);
    return;
  });
}

module.exports = parsePosts;
