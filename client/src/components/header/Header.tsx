import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import HeaderMenu from './headerMenu/HeaderMenu';
import { UserAttributes } from '../../store/user/types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  title__link: {
    color: "#FFF",
    '&:hover': {
      textDecoration: 'none',
    }
  }
}));

type OwnProps = {
  openMenu: (event: React.MouseEvent<HTMLElement>) => void,
  closeMenu: () => void,
  anchorMenu: Element | null,
  handleClickOpenAuthForm: () => void,
  handleClickOpenRegisterForm: () => void,
  isAuth: boolean,
  handleClickLogoutUser: () => void,
  handleClickOpenCreateTaskForm: () => void,
  user: UserAttributes | null,
};

type Props = OwnProps;

const Header: FC<Props> = ({
  openMenu, anchorMenu,
  closeMenu, handleClickOpenAuthForm,
  handleClickOpenRegisterForm, isAuth,
  handleClickLogoutUser, handleClickOpenCreateTaskForm,
  user,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={openMenu}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <HeaderMenu
            anchorMenu={anchorMenu}
            closeMenu={closeMenu}
            handleClickOpenAuthForm={handleClickOpenAuthForm}
            handleClickOpenRegisterForm={handleClickOpenRegisterForm}
            isAuth={isAuth}
            handleClickLogoutUser={handleClickLogoutUser}
            user={user}
          />

          <Typography variant="h6" className={classes.title}>
            <Link component={RouterLink} to="/" className={classes.title__link}>
                Доска улучшений Smartech
            </Link>
          </Typography>

          <Button
            color="secondary"
            variant="contained"
            onClick={handleClickOpenCreateTaskForm}
          >
            Предложить
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header;