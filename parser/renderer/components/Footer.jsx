import React, { PropTypes } from 'react'
import { blogExternalUrl, blogAuthor } from '../../blog.config.js'

function returnTitle(url) {
  return /..\/\d\d\d\d\/\w+\/(.*)\.html/.exec(url)[1].replace(/-/g, ' ');
}

const Footer = ({ lastLink, nextLink }) => {
  return (
    <div className='footer'>
      <hr />
      <div className='footer-flex'>
        <div className='last-link'>
          <a href={lastLink}>&lt;&lt; {returnTitle(lastLink)}</a>
        </div>
        <div className='attribution'>
          By <a href={blogExternalUrl}>{blogAuthor}</a> &copy; 2017
        </div>
        <div className='next-link'>
          <a href={nextLink}>{returnTitle(nextLink)} &gt;&gt; </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
