import React, { FC, useState } from 'react';
import { connect } from "react-redux";

import Header from '../../components/header/Header';
import AuthFormContainer from '../forms/AuthFormContainer';
import RegisterFormContainer from '../forms/RegisterFormContainer';
import CreateTaskFormContainer from '../forms/CreateTaskFormContainer';
import { RootState } from '../../store/rootReducer';
import { getIsAuth, getUser } from '../../store/user/selectors';
import { actions } from '../../store/user/action';
import { UserAttributes } from '../../store/user/types';

type MapStateToProps = {
  isAuth: boolean,
  user: UserAttributes | null,
};

type MapDispatchToProps = {
  logoutUser: () => void,
}

type Props = MapStateToProps & MapDispatchToProps;

const HeaderContainer: FC<Props> = ({
  isAuth, logoutUser,
  user,
}) => {

  const [anchorMenu, setAnchorMenu] = useState(null as Element | null);

  const [openAuthForm, setOpenAuthForm] = useState(false);

  const [openRegisterForm, setOpenRegisterForm] = useState(false);

  const [openCreateTaskDialog, setOpenCreateTaskDialog] = useState(false);

  
  const openMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorMenu(event.currentTarget)
  }
  
  const closeMenu = (): void => {
    setAnchorMenu(null);
  }
  
  const handleClickOpenAuthForm = (): void => {
    setOpenAuthForm(true);
    closeMenu();
  }

  const handleClickCLoseAuthForm = (): void => {
    setOpenAuthForm(false);
  }

  const handleClickOpenRegisterForm = (): void => {
    setOpenRegisterForm(true);
    closeMenu();
  }

  const handleClickCloseRegisterForm = (): void => {
    setOpenRegisterForm(false);
  }

  const handleClickOpenCreateTaskForm = (): void => {
    setOpenCreateTaskDialog(true);
  }

  const handleClickCloseCreateTaskForm = (): void => {
    setOpenCreateTaskDialog(false);
  }

  const handleClickLogoutUser = (): void => {
    localStorage.removeItem('token');
    logoutUser();
    closeMenu();
  }

  return (
    <>
      <AuthFormContainer
        open={openAuthForm}
        close={handleClickCLoseAuthForm}
      />

      <RegisterFormContainer 
        open={openRegisterForm}
        close={handleClickCloseRegisterForm}
      />

      <CreateTaskFormContainer
        open={openCreateTaskDialog}
        close={handleClickCloseCreateTaskForm}
      />

      <Header
        openMenu={openMenu}
        closeMenu={closeMenu}
        anchorMenu={anchorMenu}
        handleClickOpenAuthForm={handleClickOpenAuthForm}
        handleClickOpenRegisterForm={handleClickOpenRegisterForm}
        isAuth={isAuth}
        handleClickLogoutUser={handleClickLogoutUser}
        handleClickOpenCreateTaskForm={handleClickOpenCreateTaskForm}
        user={user}
      />
    </>
  )
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  isAuth: getIsAuth(state),
  user: getUser(state),
});

export default connect<MapStateToProps, MapDispatchToProps, {}, RootState>(mapStateToProps, {
  logoutUser: actions.logoutUser,
})(HeaderContainer);