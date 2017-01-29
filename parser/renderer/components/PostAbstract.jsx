import React from 'react';

const PostAbstract = ({ postData }) => {
  const { date, title, tags, body, savePath } = postData;
  return (
    <li>
      <a href={`../../${savePath}`}>{title}</a>
      <span className="abstract-date">{date}</span>
      <span className="abstract-tags">{tags.join(', ')}</span>
      <p className="abstract-body">{body.slice(0, 150).concat('...')}</p>
    </li>
  );
};

export default PostAbstract;
