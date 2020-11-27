import React, { FC, useEffect } from 'react';
import { connect } from "react-redux";
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Container from '@material-ui/core/Container';

// import { withSyspense } from './hoc/withSyspense';
import HeaderContainer from './containers/header/HeaderContainer';
import PendingTasksContainer from './containers/pendingTasks/PendingTasksContainer';
import ApprovedTasksContainer from './containers/approvedTasks/ApprovedTasksContainer';
import RejectedTasksContainer from './containers/rejectedTasks/RejectedTasksContainer';
import { RootState } from './store/rootReducer';
import { authUser } from './store/user/action';
import { getIsInitialized } from './store/user/selectors';

// const SyspensePendingTasks = withSyspense(PendingTasksContainer);
// const SyspenseApprovedTasks = withSyspense(ApprovedTasksContainer);

type MapStateToProps = {
  isInitialized: boolean,
};

type MapDispatchToProps = {
  authUser: () => void,
};

type Props = MapStateToProps & MapDispatchToProps;

const  App: FC<Props> = ({
  authUser, isInitialized,
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
              <Route exact path="/" render={() => <Redirect to="/approved-tasks" />} />
              <Route path="/pending-tasks" render={() => <PendingTasksContainer />} />
              <Route path="/approved-tasks" render={() => <ApprovedTasksContainer />} />
              <Route path="/rejected-tasks" render={() => <RejectedTasksContainer />} />
            </Switch>
          </Container>
          // TODO добавить нормальный preloader
        : null
      }

      
    </>
  );
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  isInitialized: getIsInitialized(state),
});

export default connect<MapStateToProps, MapDispatchToProps, {}, RootState>(mapStateToProps, {
  authUser,
})(App);
