import React, { Component } from 'react';

class TextBoxWithMarkdownPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userText: this.props.initialValue
    }
  }
  updatePreview() {
    this.setState({
      userText: document.getElementById('post-body').value,
    });
  }
  render() {
    return (
      <div>
        <textarea rows='4' cols='80' id='post-body' defaultValue={this.state.userText} onChange={this.updatePreview.bind(this)} />
        <div dangerouslySetInnerHTML={{__html: marked(this.state.userText) }} />
      </div>
    )
  }
}
export default TextBoxWithMarkdownPreview
