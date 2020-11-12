import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

type OwnProps = {
  user: boolean,
};

type Props = OwnProps;

const HeaderMenuItems: FC<Props> = React.forwardRef(({ user }, ref) => {
  
  return (
    <>
    {
      user
      ? [
        <MenuItem key="logout">
          <Button>
            Выйти
          </Button>
        </MenuItem>,

        <MenuItem key="reg">
        <Button>
          Добавить администратора
        </Button>
      </MenuItem>
      ]
      : [
        <MenuItem key="auth">
          <Button>
            Авторизоваться
          </Button>
        </MenuItem>,
      ]
    }
    </>
  )
});

export default HeaderMenuItems;