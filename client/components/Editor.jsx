import React from 'react';
import BlogPostComposer from './BlogPostComposer';

const App = ({ initialValue }) => (
  <div>
    <h2 id="editor-title">Tacoma Markdown Editor</h2>
    <BlogPostComposer initialValue={initialValue} />
  </div>
);
export default App;
