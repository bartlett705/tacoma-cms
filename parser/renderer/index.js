const path = require('path');
const fs = require('fs');
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const PageView = require('./components/PageView').default;
const htmlTemplate = require('./components/html-template');
const OUTPUT_DIR = require('../../blog.config.js').OUTPUT_DIR;

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  return fs.mkdirSync(dirname);
}

function renderMarkup(Posts) {
  Posts.forEach((postData, index, allPosts) => {
    const lastLinkIndex = (index + 1) % (allPosts.length);
    const nextLinkIndex = (index - 1 >= 0) ? index - 1 : allPosts.length - 1;
    const markup = ReactDOMServer.renderToStaticMarkup(<PageView
      postData={postData}
      lastLink={`../../${allPosts[lastLinkIndex].savePath}`}
      nextLink={`../../${allPosts[nextLinkIndex].savePath}`}
    />);
    const renderedPage = htmlTemplate
      .replace('{% POST %}', markup)
      .replace('{% TITLE %}', postData.title);
    const fullSavePath = path.join(OUTPUT_DIR, postData.savePath);
    ensureDirectoryExistence(fullSavePath);
    fs.writeFile(fullSavePath, renderedPage, (err) => {
      if (err) throw err;
      console.log('Wrote ', fullSavePath);
    });
  });
}

module.exports = renderMarkup;
