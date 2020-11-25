import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import PendingTaskItem from './PendingTaskItem';
import { PendingTaskAttributes } from '../../store/task/types';

type OwnProps = {
  pendingTasks: Array<PendingTaskAttributes> | null,
  setCurrentTask: (taskId: number) => void,
};

type Props = OwnProps;

const PendingTasks: FC<Props> = ({
  pendingTasks, setCurrentTask,
}) => {

  return (
    <Box clone pt={3}>
      <Grid container spacing={3}>
        { pendingTasks && pendingTasks.length
            ? pendingTasks.map((task) => <PendingTaskItem task={task} key={task.id} setCurrentTask={setCurrentTask} />)
            : <Grid item>
                <Typography>Новых задач нет</Typography>
              </Grid>
        }
      </Grid>
    </Box>
  )
}

export default PendingTasks;