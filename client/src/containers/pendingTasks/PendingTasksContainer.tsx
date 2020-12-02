import React, { FC, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route, useRouteMatch  } from 'react-router-dom';

import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { RootState } from '../../store/rootReducer';
import { PendingTaskAttributes } from '../../store/task/types';
import { getPendingTasks } from '../../store/task/selectors';
import { fetchAllPendingTask, actions } from '../../store/task/action';
import PendingTasks from '../../components/pendingTasks/PendingTasks';
import EditPendingTaskFormContainer from '../forms/EditPendingTaskFormContainer';

type MapStateToProps = {
  pendingTasks: Array<PendingTaskAttributes>,
};

type MapDispatchToProps = {
  fetchAllPendingTask: (taskId?: number) => void,
  setPendingCurrentTask: (taskId: number) => void,
};

type Props = MapStateToProps & MapDispatchToProps;

const PendingTasksContainer: FC<Props> = ({
  pendingTasks, fetchAllPendingTask,
  setPendingCurrentTask,
}) => {

  const match = useRouteMatch<{taskId: string | undefined}>('/pending-tasks/:taskId');

  useEffect(() => {
    if (match?.params.taskId) {
      fetchAllPendingTask(Number(match.params.taskId));
    } else {
      fetchAllPendingTask();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PendingTasks pendingTasks={pendingTasks} setPendingCurrentTask={setPendingCurrentTask} />
      <Route exact path="/pending-tasks/:taskId" render={() => <EditPendingTaskFormContainer />} />
    </>
  )
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  pendingTasks: getPendingTasks(state),
});

export default compose<React.ComponentType>(
  connect<MapStateToProps, MapDispatchToProps, {}, RootState>(mapStateToProps, {
    fetchAllPendingTask,
    setPendingCurrentTask: actions.setPendingCurrentTask,
  }),
  withAuthRedirect,
)(PendingTasksContainer);