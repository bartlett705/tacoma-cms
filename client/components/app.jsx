import React, { Component } from 'react';
import BlogPostComposer from './BlogPostComposer'

const App = (props) => {
  return (
    <div>
      <h2>Tacoma Markdown Editor</h2>
    <BlogPostComposer initialValue={''} />
    </div>
  )
}
export default App;
