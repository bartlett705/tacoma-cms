import React from 'react';
import BlogPostViewer from '../../client/components/BlogPostViewer'
import Footer from './Footer'

const App = ({ postData, lastLink, nextLink }) => (
  <div>
    <BlogPostViewer blogPostData={postData} />
    <Footer lastLink={'../../2015/apr/you-got-what-you-wanted.html'} nextLink={'../../2015/may/rebuild-it-all.html'} />
  </div>
);
export default App;
