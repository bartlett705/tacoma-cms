// reads all markdown files in a given directory
// and parses them into an array of post objects.

const fs = require('fs');
const path = require('path');
const moment = require('moment');
const recursive = require('recursive-readdir');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parsePosts(done) {
  const contentDir = process.env.NODE_ENV === 'TEST'
    ? path.join(__dirname, '../test/content')
    : path.join(__dirname, '../content');
  const postParser = /title: (.*)\ndate: (.*)\ntags: (.*)\n---\n([^]*)/;
  const allPosts = [];

  recursive(contentDir, (err, files) => {
    // console.log('READ ', contentDir, 'WITH FILES: ', files);
    files.forEach((file) => {
      const fileContent = fs.readFileSync(file, 'utf-8');
      const postContent = postParser.exec(fileContent);
      const [, title, postedDate, tags, body] = postContent;
      const year = moment(postedDate).year();
      const month = months[moment(postedDate).month()];
      const savePath = `${year}/${month}/${title.split(' ').join('-')}.html`;
      allPosts.push({
        title,
        postedDate,
        tags: tags.split(','),
        body,
        savePath,
      });
    });
    done(allPosts);
  });
}

module.exports = parsePosts;
