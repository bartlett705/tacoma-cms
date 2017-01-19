const ReactDOMServer = require('react-dom/server');
const React = require('react');
const PageView = require('./components/PageView').default;

function renderMarkup(Posts) {
  Posts.forEach((postData, index, allPosts) => {
    const lastLinkIndex = (index + 1) % (allPosts.length);
    const nextLinkIndex = (index - 1 >= 0) ? index - 1 : allPosts.length - 1;
    const markup = ReactDOMServer.renderToStaticMarkup(<PageView
      postData={postData}
      lastLink={`../../${allPosts[lastLinkIndex].savePath}`}
      nextLink={`../../${allPosts[nextLinkIndex].savePath}`}
    />);
    // {
    //   postData,
    // }));
    console.log(markup);
  });
}
module.exports = renderMarkup;
