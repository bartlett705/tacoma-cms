import React from 'react';
import marked from 'marked';

const tagColors = [
  'skyblue',
  '#66ab66',
  'DarkSeaGreen',
  'Thistle',
  'Salmon',
  'Gold',
  'Peru',
  'LightSteelBlue',
  'Tomato',
];

function getTagColor(tag) {
  return tagColors[tag.length % tagColors.length];
}

const BlogPostViewer = ({ postData }) => {
  const { date = Date.now(), title = 'Title Redacted', tags = ['es6', 'node', 'react', 'react-redux'], body = 'Body Omitted.' } = postData;
  return (
    <div>
      <div id="tags">
        {tags.map(tag => (
          <a className="tag" key={tag} href="#" style={{backgroundColor: getTagColor(tag)}}>
            {tag}
          </a>
        ))}
      </div>
      <div className="post-container" >
        <h1>{title}</h1>
        <div id="post-well">
          <h4 id="post-date">{date}</h4>
          <div className="post-body" dangerouslySetInnerHTML={{ __html: marked(body) }} />
        </div>
      </div>
    </div>
  );
};

export default BlogPostViewer;
