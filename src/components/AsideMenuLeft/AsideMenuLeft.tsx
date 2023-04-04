import React from 'react'
import {Button} from '@material-ui/core'
import {
    WhatshotOutlined as FireIcon,
    SmsOutlined as MessageIcon,
    TrendingUpOutlined as TrendingIcon,
    FormatListBulletedOutlined as ListIcon
} from '@material-ui/icons'

import styles from './AsideMenuLeft.module.scss'
import {Link, useLocation} from 'react-router-dom'

const menu = [
    {text: 'Лента', icon: <FireIcon/>, path: '/'},
    {text: 'Сообщения', icon: <MessageIcon/>, path: '/messages'},
    {text: 'Рейтинг RJ', icon: <TrendingIcon/>, path: '/rating'},
    {text: 'Подписки', icon: <ListIcon/>, path: '/follows'}
]

const AsideMenuLeft: React.FC = () => {
    const location = useLocation()

    const activeLink = (path: string) => {
        return location.pathname === path ? 'contained' : 'text'
    }


    return (
        <div className={styles.menu}>
            <ul>
                {menu.map((menuItem) => (
                    <li key={menuItem.path}>
                        <Link to={menuItem.path}>
                            <Button variant={activeLink(menuItem.path)}>
                                {menuItem.icon}
                                {menuItem.text}
                            </Button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AsideMenuLeft
