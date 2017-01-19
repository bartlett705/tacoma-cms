const fs = require('fs');
const path = require('path');
const moment = require('moment');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// reads all markdown files in a given directory
// and parses them into an array of post objects.
function parsePosts() {

  const contentFolder = '../content/';
  const postParser = /title: (.*)\ndate: (.*)\ntags: (.*)\n---\n([^]*)/;
  let allPosts = [];

  fs.readdir(contentFolder, (err, files) => {
    files.forEach(file => {
      console.log('file:', file);
      const fileContent = fs.readFileSync(path.join(contentFolder, file),
        'utf-8');
      const postContent = postParser.exec(fileContent);
      console.log(postContent);
      const [junk, title, postedDate, tags, body] = postContent;
      const year = moment(postedDate).year();
      const month = months[moment(postedDate).month()];
      const savePath = `${year}/${month}/${file}`;
      allPosts.push({
        title,
        postedDate,
        tags,
        body,
        savePath,
      });
    });
    console.log(allPosts);
  });

}

parsePosts();

// renders static HTML via React.
