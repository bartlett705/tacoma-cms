import React, { PropTypes } from 'react'
import marked from 'marked';

const BlogPostViewer = ({ postData }) => {
  console.log('eff u');
  const { date=Date.now(), title = 'Title Redacted', tags = [], body = 'Body Omitted.' } = postData;
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
