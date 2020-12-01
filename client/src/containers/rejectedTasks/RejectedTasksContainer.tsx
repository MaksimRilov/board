import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, useRouteMatch  } from 'react-router-dom';

import RejectedTasks from '../../components/rejectedTasks/rejectedTasks';
import RejecedTaskFormContainer from '../forms/RejecedTaskFormContainer';
import { RootState } from '../../store/rootReducer';
import { fetchAllRejectedTask, actions } from '../../store/task/action';
import { ApprovedTaskAttributes } from '../../store/task/types';
import { getRejectedTasks } from '../../store/task/selectors';

type MapStateToProps = {
  rejectedTasks: Array<ApprovedTaskAttributes>,
};

type MapDispatchToProps = {
  fetchAllRejectedTask: (taskId?: number) => void,
  setRejectedCurrentTask: (taskId: number) => void,
};

type Props = MapStateToProps & MapDispatchToProps;

const RejectedTasksContainer: FC<Props> = ({
  fetchAllRejectedTask, rejectedTasks,
  setRejectedCurrentTask,
}) => {
  const match = useRouteMatch<{taskId: string | undefined}>('/rejected-tasks/:taskId');

  useEffect(() => {
    if (match?.params.taskId) {
      fetchAllRejectedTask(Number(match.params.taskId));
    } else {
      fetchAllRejectedTask();
    }
  }, []);


  return (
    <>
      <RejectedTasks rejectedTasks={rejectedTasks} setRejectedCurrentTask={setRejectedCurrentTask} />
      <Route exact path="/rejected-tasks/:taskId" render={() => <RejecedTaskFormContainer />} />
    </>
  )
}

const mapDispatchToProps = (state: RootState): MapStateToProps => ({
  rejectedTasks: getRejectedTasks(state),
});

export default connect<MapStateToProps, MapDispatchToProps, {}, RootState>(mapDispatchToProps, {
  fetchAllRejectedTask,
  setRejectedCurrentTask: actions.setRejectedCurrentTask
})(RejectedTasksContainer);