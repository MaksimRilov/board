import React, { FC, useEffect } from 'react';
import { connect } from "react-redux";

import HeaderContainer from './containers/header/HeaderContainer';
import { RootState } from './store/rootReducer';
import { authUser } from './store/user/action';
import { getIsAuth } from './store/user/selectors';

type MapStateToProps = {
  isAuth: boolean,
};

type MapDispatchToProps = {
  authUser: () => void,
};

type Props = MapStateToProps & MapDispatchToProps;

const  App: FC<Props> = ({
  authUser, isAuth
}) => {

  useEffect(() => {
    authUser();
  }, [authUser])

  return (
    <>
      <HeaderContainer />
    </>
  );
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  isAuth: getIsAuth(state),
});

export default connect<MapStateToProps, MapDispatchToProps, {}, RootState>(mapStateToProps, {
  authUser,
})(App);
