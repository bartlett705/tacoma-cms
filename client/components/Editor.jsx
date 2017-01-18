import React from 'react';
import BlogPostComposer from './BlogPostComposer';

require('../assets/main.scss');

const App = ({ initialValue }) => (
  <div>
    <h2>Tacoma Markdown Editor</h2>
    <BlogPostComposer initialValue={initialValue} />
  </div>
);
export default App;
