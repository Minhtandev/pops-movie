import React from 'react'
import "./tag.scss"
const Tag = ({tagName, linkTo}) => {
  return (
      <div className="tag">
          {tagName}
    </div>
  )
}

export default Tag