
import React, {useState} from 'react'
import Comment from '../Comment'
import './PostComments.scss'
import AddCommentForm from '../AddCommentForm'
import {Paper, Tabs, Tab, Typography, Divider} from '@material-ui/core'
import data from '../../data'


const PostComments = () => {
    const [activeTab, setActiveTab] = useState(0)
    const comments = data.comments[activeTab === 0 ? 'popular' : 'new']

    return (
        <Paper elevation={0} className='posts-comments'>
            <div className="container">
                <Typography variant="h6" className="mb-20">
                    42 комментария
                </Typography>
                <Tabs
                    className='posts-comments__tabs'
                    value={activeTab}
                    onChange={(_, newValue) => setActiveTab(newValue)}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Популярные"/>
                    <Tab label="По порядку"/>
                </Tabs>
                <Divider/>
                <AddCommentForm />
                <div className='posts-comments__comments'/>
                {
                    comments.map(obj => <Comment key={obj.id} user={obj.user} text={obj.text} createdAt={obj.createdAt}/>)
                }
            </div>
        </Paper>
    )
}

export default PostComments