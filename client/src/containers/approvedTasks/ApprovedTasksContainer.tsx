import React, { FC, useEffect } from 'react';
import { Route, useRouteMatch  } from 'react-router-dom';
import { connect } from 'react-redux';

import ApprovedTasks from '../../components/approvedTask/ApprovedTasks';
import EditApprovedTaskFormContainer from '../forms/EditApprovedTaskFormContainer';
import { RootState } from '../../store/rootReducer';
import { fetchAllApprovedTask, actions } from '../../store/task/action';
import { ApprovedTaskAttributes } from '../../store/task/types';
import { getApprovedTasks } from '../../store/task/selectors';

type MapStateToProps = {
  approvedTask: Array<ApprovedTaskAttributes>,
};

type MapDispatchToProps = {
  fetchAllApprovedTask: (taskId?: number) => void,
  setApprovedCurrentTask: (taskId: number) => void,
};

type Props = MapStateToProps & MapDispatchToProps;

const ApprovedTasksContainer: FC<Props> = ({
  fetchAllApprovedTask, approvedTask,
  setApprovedCurrentTask,
}) => {

  const match = useRouteMatch<{taskId: string | undefined}>('/approved-tasks/:taskId');
  
  useEffect(() => {
    if (match?.params.taskId) {
      fetchAllApprovedTask(Number(match.params.taskId));
    } else {
      fetchAllApprovedTask();
    }
  }, []);

  return (
    <>
      <ApprovedTasks approvedTask={approvedTask} setApprovedCurrentTask={setApprovedCurrentTask} />
      <Route exact path="/approved-tasks/:taskId" render={() => <EditApprovedTaskFormContainer />} />
    </>
  )
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  approvedTask: getApprovedTasks(state),
});

export default connect<MapStateToProps, MapDispatchToProps, {}, RootState>(mapStateToProps, {
  fetchAllApprovedTask,
  setApprovedCurrentTask: actions.setApprovedCurrentTask,
})(ApprovedTasksContainer);