import React, { Component } from 'react';
import BlogPostViewer from './BlogPostViewer';

class BlogPostComposer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postData: {
        date: null,
      },
    }
  }
  updatePreview(target) {
    //  console.log('target: ', target);
    //  console.log(`input-${target}`);
    //  console.log(document.getElementById(`input-${target}`));
    const updatedField = target ==='tags' ?
      document.getElementById(`input-${target}`).value.split(' ') :
      document.getElementById(`input-${target}`).value;
      const newPostData = Object.assign({},
        this.state.postData,
        {
          [target]: updatedField
        });
    this.setState({
      postData: newPostData,
    });
  }
  savePost(publish) {
    console.log('Sending: ', this.state.postData);
  }
  render() {
    return (
      <div>
        <form name='postComposer'>
          <input type='text' id='input-title' placeholder='title' onChange={() => this.updatePreview('title')} />
          <input type='text' id='input-date'  onChange={() => this.updatePreview('date')} />
          <input type='text' id='input-tags'  placeholder='tags' onChange={() => this.updatePreview('tags')} />
          <textarea rows='4' cols='80' id='input-body' onChange={() => this.updatePreview('body')} />
        </form>
        <button id='btn-post' onClick={() => this.savePost(false)}>Save</button>
        <button id='btn-post' onClick={() => this.savePost(true)}>Publish</button>
        <BlogPostViewer blogPostData={this.state.postData} />
      </div>
    )
  }
}
export default BlogPostComposer