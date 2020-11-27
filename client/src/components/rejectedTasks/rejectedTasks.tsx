import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import RejectedTaskItem from './RejectedTaskItem';
import { ApprovedTaskAttributes } from '../../store/task/types';

type OwnProps = {
  rejectedTasks: Array<ApprovedTaskAttributes>,
  setRejectedCurrentTask: (taskId: number) => void,
};

type Props = OwnProps;

const RejectedTasks: FC<Props> = ({
  rejectedTasks, setRejectedCurrentTask,
}) => {
  return (
    <Box clone pt={3}>
      <Grid container spacing={3}>
        { rejectedTasks && rejectedTasks.length
            ? rejectedTasks.map((task) => <RejectedTaskItem task={task} key={task.id} setRejectedCurrentTask={setRejectedCurrentTask} />)
            : <Grid item>
                <Typography>Новых задач нет</Typography>
              </Grid>
        }
      </Grid>
    </Box>
  )
}

export default RejectedTasks;