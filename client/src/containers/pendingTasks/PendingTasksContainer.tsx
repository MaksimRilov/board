import React, { FC, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { RootState } from '../../store/rootReducer';
import { TaskAttributes } from '../../store/task/types';
import { getPendingTasks } from '../../store/task/selectors';
import { fetchAllPendingTask } from '../../store/task/action';
import PendingTasks from '../../components/pendingTask/PendingTasks';

type MapStateToProps = {
  pendingTasks: Array<TaskAttributes> | null,
};

type MapDispatchToProps = {
  fetchAllPendingTask: () => void,
};

type Props = MapStateToProps & MapDispatchToProps;

const PendingTasksContainer: FC<Props> = ({
  pendingTasks, fetchAllPendingTask,
}) => {

  useEffect(() => {
    fetchAllPendingTask();
  }, [pendingTasks?.length, fetchAllPendingTask]);


  return (
    <PendingTasks pendingTasks={pendingTasks} />
  )
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  pendingTasks: getPendingTasks(state),
});

export default compose<React.ComponentType>(
  connect<MapStateToProps, MapDispatchToProps, {}, RootState>(mapStateToProps, {
    fetchAllPendingTask,
  }),
  withAuthRedirect,
)(PendingTasksContainer);