import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { ApprovedTaskAttributes } from '../../store/task/types'

const useStyles = makeStyles({
  date: {
    fontSize: 14,
  },
});

type OwnProps = {
  task: ApprovedTaskAttributes,
  setApprovedCurrentTask: (taskId: number) => void,
};

type Props = OwnProps;

const ApprovedTaskItem: FC<Props> = ({
  task, setApprovedCurrentTask,
}) => {
  const classes = useStyles();

  return (
    <Box clone mb={3}>
      <Card>

        <CardContent>
          <Typography color="textSecondary" gutterBottom className={classes.date}>{moment(task.createdAt).format('L')}</Typography>
          <Typography variant="h5" component="h2" align="center" gutterBottom>{task.title}</Typography>
          <Typography color="textSecondary" >Автор: {task.author || 'Автор не указан'}</Typography>
          <Typography color="textSecondary">Email: {task.email || 'Email не указан'}</Typography>
        </CardContent>

        <CardActions>
            <Button
              size="small"
              color="primary"
              component={RouterLink}
              to={`/approved-tasks/${task.id}`}
              onClick={() => setApprovedCurrentTask(task.id)}
            >
                Информация
              </Button>
          </CardActions>

      </Card>
    </Box>
  )
}

export default ApprovedTaskItem;