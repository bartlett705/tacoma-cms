import React from 'react';
import BlogPostViewer from '../../../common/components/BlogPostViewer'
import Footer from './Footer'

const PageViewer = ({ postData, lastLink, nextLink }) => (
  <div>
    <BlogPostViewer postData={postData} />
    <Footer lastLink={lastLink} nextLink={nextLink} />
  </div>
);
export default PageViewer;
