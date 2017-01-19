const ReactDOMServer = require('react-dom/server');

function renderMarkup(allPosts) {
  allPosts.forEach((postObj) => {
    const markup = ReactDOMServer.renderToStaticMarkup(index);
    console.log(markup);
  })
}
module.exports = renderMarkup;
