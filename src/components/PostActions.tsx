import React, { CSSProperties } from 'react'
import { IconButton } from '@material-ui/core'
import { VisibilityOutlined, ModeCommentOutlined, ShareOutlined } from '@material-ui/icons'

const styles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  top: '5',
  listStyle: 'none',
  padding: '0',
  margin: '0'
}

export const PostActions = (props: any) => {
  return (
    <ul style={styles}>
      <li>
        <IconButton>
          <ModeCommentOutlined />
        </IconButton>
      </li>
      <li>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </li>
      <li>
        <IconButton>
          <div className='post__visibility'>
            <VisibilityOutlined />
            <span>{props.views}</span>
          </div>
        </IconButton>
      </li>
    </ul>
  )
}
