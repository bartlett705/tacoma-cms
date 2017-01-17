import React, { Component } from 'react';
import BlogPostComposer from '../../client/components/BlogPostViewer'
import BlogPostComposer from '../../client/components/Footer'
import Footer from './Footer'

function returnTitle(url) {
  return /..\/\d\d\d\d\/\w+\/(.*)\.html/.exec(url)[1];
}

const App = (props) => {
  return (
    <div>
    <BlogPostViewer blogPostData={this.state.postData} />
    <Footer lastLink={'../../2015/apr/you-got-what-you-wanted.html'} nextLink={'../../2015/may/rebuild-it-all.html'} />
    </div>
  )
}
export default App;
