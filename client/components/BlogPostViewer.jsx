import React, { PropTypes } from 'react'
import marked from 'marked';

const BlogPostViewer = (props) => {
  const { date=Date.now(), title = 'Title Redacted', tags = [], body = 'Body Omitted.' } = props.blogPostData;
    return (
      <div className='post-container' >

        <h1>{title}</h1>
        <h4>{date}</h4>
        [ {tags.join(', ')} ]
        <div className='post-body' dangerouslySetInnerHTML={{__html: marked(body)}} />
      </div>
    );
}

export default BlogPostViewer;
