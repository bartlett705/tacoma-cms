// renders static HTML via React.

const path = require('path');
const fs = require('fs');
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const PageView = require('./components/PageView').default;
const TagIndex = require('./components/TagIndex').default;
const htmlTemplate = require('./components/html-template');

const OUTPUT_DIR = process.env.NODE_ENV === 'TEST'
  ? path.join(__dirname, '../../test/output')
  : path.join(__dirname, '../../output');

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  return fs.mkdirSync(dirname);
}

function renderMarkup(posts) {
  const taglist = new Set();
  posts.forEach((postData, index, allPosts) => {
    postData.tags.forEach(tag => taglist.add(tag));
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
  console.log('All tags: ', taglist);
  taglist.forEach((tag) => {
    console.log('assembling tag index for ', tag);
    const relevantPosts = posts.filter(post => post.tags.includes(tag));
    const markup = ReactDOMServer
      .renderToStaticMarkup(<TagIndex posts={relevantPosts} tag={tag} />);
    const renderedPage = htmlTemplate
    .replace('{% POST %}', markup)
    .replace('{% TITLE %}', `Posts concerning ${tag}`);
    console.log(renderedPage);
    fs.writeFile(path.join(OUTPUT_DIR, `tags/${tag}.html`), renderedPage, (err) => {
      if (err) throw err;
      console.log('Wrote index for tag:', tag);
    });
  });
}

module.exports = renderMarkup;
