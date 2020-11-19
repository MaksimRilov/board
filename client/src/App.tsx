import React, { FC, useEffect } from 'react';
import { connect } from "react-redux";
import {
  Switch,
  Route,
} from 'react-router-dom';
import Container from '@material-ui/core/Container';

import { withSyspense } from './hoc/withSyspense';
import HeaderContainer from './containers/header/HeaderContainer';
import PendingTasksContainer from './containers/pendingTasks/PendingTasksContainer';
import { RootState } from './store/rootReducer';
import { authUser } from './store/user/action';
import { getIsAuth, getIsInitialized } from './store/user/selectors';

const SyspensePendingTasks = withSyspense(PendingTasksContainer);

type MapStateToProps = {
  isAuth: boolean,
  isInitialized: boolean,
};

type MapDispatchToProps = {
  authUser: () => void,
};

type Props = MapStateToProps & MapDispatchToProps;

const  App: FC<Props> = ({
  authUser, isAuth,
  isInitialized,
}) => {

  useEffect(() => {
    authUser();
  }, [authUser])

  return (
    <>
      <HeaderContainer />
      
      { isInitialized
        ? <Container maxWidth={false}>
            <Switch>
              <Route exact path="/" render={() => <div>MAIN</div>} />
              <Route path="/pending-tasks" render={() => <SyspensePendingTasks />} />
            </Switch>
          </Container>
          // TODO добавить нормальный preloader
        : <div>loader...</div>
      }

      
    </>
  );
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  isAuth: getIsAuth(state),
  isInitialized: getIsInitialized(state),
});

export default connect<MapStateToProps, MapDispatchToProps, {}, RootState>(mapStateToProps, {
  authUser,
})(App);
