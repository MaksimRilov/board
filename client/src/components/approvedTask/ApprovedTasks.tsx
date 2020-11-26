import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ApprovedTaskItem from './ApprovedTaskItem';
import { ApprovedTaskAttributes } from '../../store/task/types'

type OwnProps = {
  approvedTask: Array<ApprovedTaskAttributes>
  setApprovedCurrentTask: (taskId: number) => void,
};

type Props = OwnProps;

const ApprovedTasks: FC<Props> = ({
  approvedTask, setApprovedCurrentTask,
}) => {
  return (
    <Box clone pt={3}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography variant="h5" gutterBottom style={{textAlign: 'center'}}>Принято к рассмотрению</Typography>
          {approvedTask.map((task) => {
            if (task.statusId === 2) {
              return <ApprovedTaskItem key={task.id} task={task} setApprovedCurrentTask={setApprovedCurrentTask} />
            }
            return null
          })}
        </Grid>

        <Grid item xs={3}>
          <Typography variant="h5" gutterBottom style={{textAlign: 'center'}}>Запланировано</Typography>
          {approvedTask.map((task) => {
            if (task.statusId === 3) {
              return <ApprovedTaskItem key={task.id} task={task} setApprovedCurrentTask={setApprovedCurrentTask} />
            }
            return null
          })}
        </Grid>

        <Grid item xs={3}>
          <Typography variant="h5" gutterBottom style={{textAlign: 'center'}}>В работе</Typography>
          {approvedTask.map((task) => {
            if (task.statusId === 4) {
              return <ApprovedTaskItem key={task.id} task={task} setApprovedCurrentTask={setApprovedCurrentTask} />
            }
            return null
          })}
        </Grid>

        <Grid item xs={3}>
          <Typography variant="h5" gutterBottom style={{textAlign: 'center'}}>Выполнено</Typography>
          {approvedTask.map((task) => {
            if (task.statusId === 5) {
              return <ApprovedTaskItem key={task.id} task={task} setApprovedCurrentTask={setApprovedCurrentTask} />
            }
            return null
          })}
        </Grid>
      </Grid>
    </Box>
  )
}

export default ApprovedTasks;