import React, { Component } from 'react';
import TextBoxWithMarkdownPreview from './TextBoxWithMarkdownPreview'

const App = (props) => {
  return (
    <div>
      Hello World!
    <TextBoxWithMarkdownPreview initialValue={''} />
    </div>
  )
}
export default App;
