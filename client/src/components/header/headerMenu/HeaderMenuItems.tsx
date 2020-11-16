import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

type OwnProps = {
  user: boolean,
  handleClickOpenAuthForm: () => void,
};

type Props = OwnProps;

const HeaderMenuItems: FC<Props> = React.forwardRef(({
  user, handleClickOpenAuthForm,
}, ref) => {
  
  return (
    <>
    {
      user
      ? [
        <MenuItem key="logout">
          <Button
            variant="contained"
            color="primary"
            fullWidth
          >
            Добавить администратора
          </Button>
        </MenuItem>,

        <MenuItem key="reg">
          <Button
            variant="contained"
            color="secondary"
            fullWidth
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