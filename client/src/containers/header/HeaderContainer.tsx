import React, { FC, useState } from 'react';
import { connect } from "react-redux";

import Header from '../../components/header/Header';
import AuthFormContainer from '../forms/AuthFormContainer';
import { RootState } from '../../store/rootReducer';
import { getIsAuth } from '../../store/user/selectors';

type MapStateToProps = {
  isAuth: boolean,
};

type Props = MapStateToProps;

const HeaderContainer: FC<Props> = ({
  isAuth,
}) => {

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
        isAuth={isAuth}
      />
    </>
  )
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  isAuth: getIsAuth(state),
});

export default connect<MapStateToProps, {}, {}, RootState>(mapStateToProps, {

})(HeaderContainer);