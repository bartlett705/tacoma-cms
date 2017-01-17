import React, { Component } from 'react';
import BlogPostComposer from './BlogPostComposer'
import Footer from './Footer'
function returnTitle(url) {
  return /..\/\d\d\d\d\/\w+\/(.*)\.html/.exec(url)[1];
}
const App = (props) => {
  return (
    <div>
      <h2>Tacoma Markdown Editor</h2>
    <BlogPostComposer initialValue={''} />
    <Footer lastLink={'../../2015/apr/you-got-what-you-wanted.html'} nextLink={'../../2015/may/rebuild-it-all.html'} />
    </div>
  )
}
export default App;
