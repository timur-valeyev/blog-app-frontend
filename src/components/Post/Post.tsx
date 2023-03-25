import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import  './Post.scss';
import { PostActions } from '../PostActions';
import {Link} from 'react-router-dom'

const Post: React.FC = () => {
  return (
    <Paper elevation={0} className="post">
      <Typography variant="h5" className='post__title'>
        <Link to="/news/test-123">
            Кот прилёг отдохнуть в английском парке миниатюр — и стал героем шуток и фотожаб о
            «гигантском пушистом захватчике»
        </Link>
      </Typography>
      <Typography className="post__description">
        Пока одни не могли соотнести размеры животного и окружения, другие начали создавать
        апокалиптические сюжеты с котом в главной роли.
      </Typography>
      <img
        src="https://leonardo.osnova.io/a21ca5a9-d95b-560d-9a6f-9fa87eff7fcd/-/preview/600/-/format/webp/"
        height={500}
        width={600}
        alt='post-image'
      />
      <PostActions />
    </Paper>
  );
};

export default Post