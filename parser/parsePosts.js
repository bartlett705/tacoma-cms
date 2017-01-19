const fs = require('fs');
const path = require('path');
const moment = require('moment');
const render = require('./renderer');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// reads all markdown files in a given directory
// and parses them into an array of post objects.
function parsePosts() {

  const contentFolder = path.join(__dirname, '../content/');
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
      const savePath = `${year}/${month}/${file.slice(0, file.length - 3)}.html`;
      allPosts.push({
        title,
        postedDate,
        tags: tags.split(','),
        body,
        savePath,
      });
    });
    console.log(allPosts);
    render(allPosts);
  });

}

parsePosts();

// renders static HTML via React.
