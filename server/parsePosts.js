const fs = require('fs');
const path = require('path');


// reads all markdown files in a given directory
// and parses them into a json.
function parsePosts() {

  const contentFolder = '../content/';
  const postParser = /title: (.*)\ndate: (.*)\ntags: (.*)\n---\n(.*)/;
  const allPosts = [];

  fs.readdir(contentFolder, (err, files) => {
    files.forEach(file => {
      console.log('file:', file);
      const fileContent = fs.readFileSync(path.join(contentFolder, file),
        'utf-8');
      const postContent = postParser.exec(fileContent);
      console.log(postContent);
      const [junk, title, postedDate, tags, body] = postContent;
      allPosts.push({
        title,
        postedDate,
        tags,
        body,
      });
    });
    console.log(allPosts);
  });

}

parsePosts();

// renders static HTML via React.
