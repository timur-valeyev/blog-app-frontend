import React from 'react';
import {Paper, Typography} from '@material-ui/core';
import './Post.scss';
import {PostActions} from '../PostActions';
import {Link} from 'react-router-dom'
import {IPost} from "../../types/data";


const Post: React.FC <IPost> = (props) => {
    const {title, content, imageUrl} = props

    return (
        <Paper elevation={0} className="post">
            <Typography variant="h5" className='post__title'>
                <Link to="/news/test-123">{title}</Link>
            </Typography>
            <Typography className="post__description">{content}</Typography>
            <img
                src={`http://localhost:8888/uploads/${imageUrl}`}
                height={500}
                width={600}
                alt={title}
            />
            <PostActions/>
        </Paper>
    );
};

export default Post