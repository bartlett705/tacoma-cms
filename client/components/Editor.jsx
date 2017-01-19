import React from 'react';
import BlogPostComposer from './BlogPostComposer';

const App = ({ initialValue }) => (
  <div>
    <h2>Tacoma Markdown Editor</h2>
    <BlogPostComposer initialValue={initialValue} />
  </div>
);
export default App;
