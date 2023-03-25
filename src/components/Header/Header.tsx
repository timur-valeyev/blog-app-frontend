import React from 'react';

import {
  Paper,
  Button,
  IconButton
} from '@material-ui/core'
import {
  SearchOutlined as SearchIcon,
  SmsOutlined as MessageIcon,
  Menu as MenuIcon,
  NotificationsNoneOutlined as NotificationIcon,
  AccountCircleOutlined as UserIcon,
} from '@material-ui/icons';

import styles from './Header.module.scss';
import {Link} from 'react-router-dom'
import AuthForm from '../AuthForm'

const Header: React.FC = () => {
  const [authVisible, setAuthVisible] = React.useState(false);

  const openAuthModal = () => {
    setAuthVisible(true);
  };

  const closeAuthModal = () => {
    setAuthVisible(false);
  };



  return (
    <Paper classes={{ root: styles.header }} elevation={0}>
      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Link to="/">
            <img height={35} className="mr-20" src="/static/img/logo.svg" alt="Logo" />
        </Link>

        <div className={styles.searchBlock}>
          <SearchIcon />
          <input placeholder="Поиск" />
        </div>

        <Link to="/write">
            <Button variant="contained" className={styles.penButton}>
              Новая запись
            </Button>
        </Link>
      </div>
      <div  style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <IconButton>
          <MessageIcon />
        </IconButton>
        <IconButton>
          <NotificationIcon />
        </IconButton>
        {/*<Link to="/profile/1">*/}
        {/*  <a className="d-flex align-center">*/}
        {/*    <Avatar*/}
        {/*      className={styles.avatar}*/}
        {/*      alt="Remy Sharp"*/}
        {/*      src="https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/"*/}
        {/*    />*/}
        {/*    <ArrowBottom />*/}
        {/*  </a>*/}
        {/*</Link>*/}
        <div className={styles.loginButton} onClick={openAuthModal}>
          <UserIcon />
          Войти
        </div>
      </div>
      <AuthForm onClose={closeAuthModal} visible={authVisible} />
    </Paper>
  );
};

export default Header
