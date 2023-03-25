import {Paper, Avatar, Typography, Button, Tabs, Tab} from '@material-ui/core'
import {
    SettingsOutlined as SettingsIcon,
    TextsmsOutlined as MessageIcon
} from '@material-ui/icons'
import {MainLayout} from '../../layouts/MainLayout'
import {Link} from 'react-router-dom'
import Post from '../../components/Post'
import './ProfilePage.scss'


const ProfilePage = () => {
    return (
        <MainLayout contentFullWidth hideComments>
            <Paper className="profile-page" elevation={0}>
                <div className="profile-page__avatar">
                    <div>
                        <Avatar
                            style={{width: 120, height: 120, borderRadius: 6}}
                            src="https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/"
                        />
                        <Typography style={{fontWeight: 'bold', marginTop: '10px'}} className="mt-10" variant="h4">
                            Amon Bower
                        </Typography>
                    </div>
                    <div>
                        <Link to="/profile/settings">
                            <Button
                                style={{height: 42, minWidth: 45, width: 45, marginRight: 10}}
                                variant="contained">
                                <SettingsIcon/>
                            </Button>
                        </Link>
                        <Button style={{height: 42}} variant="contained" color="primary">
                            <MessageIcon className="mr-10"/>
                            Написать
                        </Button>
                    </div>
                </div>
                <div className='profile-page__info'>
                    <Typography style={{fontWeight: 'bold', color: '#35AB66'}} className="mr-15">
                        +208
                    </Typography>
                    <Typography>2 подписчика</Typography>
                    <Typography>На проекте с 15 сен 2016</Typography>
                </div>

                <Tabs className="mt-20" value={0} indicatorColor="primary" textColor="primary">
                    <Tab label="Статьи"/>
                    <Tab label="Комментарии"/>
                    <Tab label="Закладки"/>
                </Tabs>
            </Paper>
            <div className="profile-content">
                <div className="profile-content__posts">
                    <Post/>
                </div>
                <Paper style={{width: 300}} className="profile-content__subscribers" elevation={0}>
                    <b>Подписчики</b>
                    <div className="subscriber-avatars">
                        <Avatar
                            className="mr-10"
                            src="https://leonardo.osnova.io/2d20257c-fec5-4b3e-7f60-055c86f24a4d/-/scale_crop/108x108/-/format/webp/"
                        />
                        <Avatar
                            className="mr-10"
                            src="https://leonardo.osnova.io/2d20257c-fec5-4b3e-7f60-055c86f24a4d/-/scale_crop/108x108/-/format/webp/"
                        />
                    </div>
                </Paper>
            </div>
        </MainLayout>
    )
}

export default ProfilePage
