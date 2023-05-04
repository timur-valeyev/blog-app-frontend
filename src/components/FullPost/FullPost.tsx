import { Divider, Paper, Typography } from '@material-ui/core'
import React from 'react'
import './FullPost.scss'


const FullPost = (props:any) => {
    const {title, body, image, user} = props

    return (
        <Paper elevation={0} className='full-post'>
            <div className="container">
                <img
                  src={`/upload/${image}`}
                  height={500}
                  width={600}
                  alt={title}
                />
                <Typography variant="h4" className='full-post__title'>
                    {title && title}
                </Typography>
                <div>
                    <Typography>
                        {body && <span dangerouslySetInnerHTML={{ __html: body }} />}
                    </Typography>
                    <Divider/>
                    <div className="user-info">
                        <div className="user-info__content">
                            <img
                                src="https://leonardo.osnova.io/104b03b4-5173-fd9f-2af9-b458dddc4a23/-/scale_crop/108x108/-/format/webp/"
                                alt="Avatar"
                            />
                            <b>{user && user.fullName}</b>
                        </div>
                        {/*<div className='user-info__buttons'>*/}
                        {/*    <Button variant="contained" className="mr-15">*/}
                        {/*        <MessageIcon/>*/}
                        {/*    </Button>*/}
                        {/*    <Button variant="contained">*/}
                        {/*        <UserAddIcon/>*/}
                        {/*        <b>Подписаться</b>*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default FullPost