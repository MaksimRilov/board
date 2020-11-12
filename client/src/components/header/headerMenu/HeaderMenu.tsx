import React, { FC } from 'react';
import Menu from '@material-ui/core/Menu';

import HeaderMenuItems from './HeaderMenuItems';

type OwnProps = {
  anchorMenu: Element | null,
  closeMenu: () => void,
};

type Props = OwnProps;

const HeaderMenu: FC<Props> = React.forwardRef(({
  anchorMenu, closeMenu,
},
  ref) => {
  
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
    >
      <HeaderMenuItems user={false} />
    </Menu>
  )
});

export default HeaderMenu;