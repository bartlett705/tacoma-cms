import React from 'react';
import PostAbstract from './PostAbstract';

const TagIndex = ({ tag, posts }) => (
  <div className="tag-index-container">
    <div className="tag">
      {tag}
    </div>
    <div className="post-well">
      <ul className="abstract-list">
        {posts.map(post => <PostAbstract postData={post} />)}
      </ul>
    </div>
  </div>
);

export default TagIndex;
