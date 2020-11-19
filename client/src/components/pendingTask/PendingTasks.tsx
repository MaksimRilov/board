import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import PendingTaskItem from './PendingTaskItem';
import { TaskAttributes } from '../../store/task/types';

type OwnProps = {
  pendingTasks: Array<TaskAttributes> | null,
};

type Props = OwnProps;

const PendingTasks: FC<Props> = ({
  pendingTasks,
}) => {

  return (
    <Grid container justify="space-around">
      { pendingTasks && pendingTasks?.length
          ? pendingTasks?.map((task) => <PendingTaskItem key={task.id} />)
          : <Box clone pt={2}>
              <Grid item>
                <Typography>Новых задач нет</Typography>
              </Grid>
            </Box>
      }
    </Grid>
  )
}

export default PendingTasks;