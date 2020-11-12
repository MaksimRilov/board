import React, { useState } from 'react';
import Header from '../../components/header/Header';

const HeaderContainer = () => {

  const [anchorMenu, setAnchorMenu] = useState(null as Element | null);
  
  const openMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorMenu(event.currentTarget)
  }

  const closeMenu = (): void => {
    setAnchorMenu(null);
  }

  return (
    <Header
      openMenu={openMenu}
      closeMenu={closeMenu}
      anchorMenu={anchorMenu}
    />
  )
}

export default HeaderContainer;