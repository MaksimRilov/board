import React, { useState } from 'react';

import Header from '../../components/header/Header';
import AuthFormContainer from '../forms/AuthFormContainer';

const HeaderContainer = () => {

  const [anchorMenu, setAnchorMenu] = useState(null as Element | null);

  const [openAuthForm, setOpenAuthForm] = useState(false);

  
  const openMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorMenu(event.currentTarget)
  }
  
  const closeMenu = (): void => {
    setAnchorMenu(null);
  }
  
  const handleClickOpenAuthForm = (): void => {
    setOpenAuthForm(true);
  }

  const handleClickCLoseAuthForm = (): void => {
    setOpenAuthForm(false);
  }

  return (
    <>
      <AuthFormContainer
        open={openAuthForm}
        close={handleClickCLoseAuthForm}
      />

      <Header
        openMenu={openMenu}
        closeMenu={closeMenu}
        anchorMenu={anchorMenu}
        handleClickOpenAuthForm={handleClickOpenAuthForm}
      />
    </>
  )
}

export default HeaderContainer;