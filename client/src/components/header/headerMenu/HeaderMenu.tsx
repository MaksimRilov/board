import React, { FC } from 'react';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core';

import HeaderMenuItems from './HeaderMenuItems';
import { UserAttributes } from '../../../store/user/types';

const useStyles = makeStyles(() => ({
  paper: {
    border: '1px solid #d3d4d5',
  },
}));

type OwnProps = {
  anchorMenu: Element | null,
  closeMenu: () => void,
  handleClickOpenAuthForm: () => void,
  handleClickOpenRegisterForm: () => void,
  isAuth: boolean,
  handleClickLogoutUser: () => void,
  user: UserAttributes | null,
};

type Props = OwnProps;

const HeaderMenu: FC<Props> = React.forwardRef(({
  anchorMenu, closeMenu,
  handleClickOpenAuthForm, handleClickOpenRegisterForm,
  isAuth, handleClickLogoutUser,
  user,
},
  ref) => {

  const classes = useStyles();
  
  return (
    <Menu
      ref={ref}
      open={Boolean(anchorMenu)}
      onClose={closeMenu}
      getContentAnchorEl={null}
      anchorEl={anchorMenu}
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      classes={{paper: classes.paper}}
    >
      <HeaderMenuItems
        isAuth={isAuth}
        handleClickOpenAuthForm={handleClickOpenAuthForm}
        handleClickOpenRegisterForm={handleClickOpenRegisterForm}
        handleClickLogoutUser={handleClickLogoutUser}
        user={user}
        closeMenu={closeMenu}
      />
    </Menu>
  )
});

export default HeaderMenu;