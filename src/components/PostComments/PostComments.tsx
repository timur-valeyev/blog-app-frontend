import React, { useEffect } from 'react'
import Comment from '../Comment'
import './PostComments.scss'
import AddCommentForm from '../AddCommentForm'
import {Paper, Typography, Divider} from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchComments } from '../../store/slices/commentsSlice'


const PostComments = (props: any) => {
    const {postId} = props
    const dispatch = useAppDispatch()
    const comments = useAppSelector(state => state.comments.comments)
    const postComments = comments.filter((comment:any) =>  comment.post.id === Number(postId))

    useEffect(() => {
        dispatch(fetchComments())
    }, [dispatch])

    return (
        <Paper elevation={0} className='posts-comments'>
            <div className="container">
                <Typography variant="h6" className="mb-20">
                    42 комментария
                </Typography>
                <Divider/>
                <AddCommentForm postId={postId}/>
                <div className='posts-comments__comments'/>
                {
                    postComments.map((comment: any) => <Comment key={comment.id} {...comment}/>)
                }
            </div>
        </Paper>
    )
}

export default PostComments