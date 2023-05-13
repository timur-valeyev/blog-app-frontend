import React from 'react'
import TagOutlinedIcon from '@mui/icons-material/TagOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import styles from './LeftMenu.module.scss'


const menu = [
  { text: 'Лента', icon: <WhatshotOutlinedIcon />, path: '/' },
  { text: 'Хештеги', icon: <TagOutlinedIcon />, path: '/tags' },
  { text: 'Категории', icon: <CategoryOutlinedIcon />, path: '/сategories' },
  { text: 'Пользователи', icon: <PeopleAltOutlinedIcon />, path: '/users' }
]


export const LeftMenu = () => {

  return (
    <div className={styles.menu}>
      <ul>
        {menu.map((obj) => (
          <li key={obj.path}>
            <Link to={obj.path}>
              <Button>
                {obj.icon}
                {obj.text}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
