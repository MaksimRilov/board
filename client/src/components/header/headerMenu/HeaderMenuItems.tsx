import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

import { UserAttributes } from '../../../store/user/types';

type OwnProps = {
  isAuth: boolean,
  handleClickOpenAuthForm: () => void,
  handleClickOpenRegisterForm: () => void,
  handleClickLogoutUser: () => void,
  user: UserAttributes | null,
  closeMenu: () => void,
};

type Props = OwnProps;

const HeaderMenuItems: FC<Props> = React.forwardRef(({
  isAuth, handleClickOpenAuthForm,
  handleClickOpenRegisterForm, handleClickLogoutUser,
  user, closeMenu,
}, ref) => {
  
  return (
    <>
    {
      isAuth
      ? [
        <MenuItem key="username" disabled>
          <Typography>
            {user?.firstName} {user?.lastName}
          </Typography>
        </MenuItem>,

        <MenuItem key="logout">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClickOpenRegisterForm}
          >
            Добавить администратора
          </Button>
        </MenuItem>,

        <MenuItem key="moderation">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={closeMenu}
            component={RouterLink}
            to="/new-tasks"
          >
            Модерация предложений
          </Button>
        </MenuItem>,

        <MenuItem key="reg">
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleClickLogoutUser}
          >
            Выйти
          </Button>
        </MenuItem>
      ]
      : [
        <MenuItem key="auth">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClickOpenAuthForm}
          >
            Авторизоваться
          </Button>
        </MenuItem>,
      ]
    }
    </>
  )
});

export default HeaderMenuItems;