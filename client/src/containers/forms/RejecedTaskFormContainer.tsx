import React, { FC, useEffect } from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import momemt from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import RejectedTaskForm from '../../components/forms/RejectedTaskForm';
import { RootState } from '../../store/rootReducer';
import { ApprovedTaskAttributes, StatusAttributes } from '../../store/task/types'
import { getRejectedCurrentTask } from '../../store/task/selectors'
import { actions } from '../../store/task/action'

type MapStateToProps = {
  currentTask: ApprovedTaskAttributes | null,
};

type MapDispatchToProps = {
  setRejectedCurrentTask: (taskId: null) => void,
};

type Props = MapStateToProps & MapDispatchToProps;

const RejecedTaskFormContainer: FC<Props>  = ({
  currentTask, setRejectedCurrentTask,
}) => {
  const history = useHistory();

  const handleClose = () => {
    history.replace('/rejected-tasks');
    setRejectedCurrentTask(null);
  }
  return (
    <>
    { currentTask && 
      <>
        <Dialog
          open={Boolean(currentTask)}
          maxWidth="md"
          onClose={handleClose}
        >

            <DialogTitle>
              <Typography>{currentTask.title}</Typography>
            </DialogTitle>

            <Formik
              onSubmit={() => {}}
              initialValues={{
                id: currentTask.id,
                title: currentTask.title,
                author: currentTask.author,
                email: currentTask.email,
                description: currentTask.description,
                usersId: currentTask.users.map((user) => user.id) as Array<number>,
                statusId: currentTask.statusId,
                statuses: currentTask.statuses,
                completionDate: momemt(currentTask.completionDate).format('YYYY-MM-DDThh:mm'),
                createdAt: currentTask.createdAt,
                updatedAt: currentTask.updatedAt,
                users: currentTask.users,
              }}
            >
              {props => {
                const {
                  values,
                } = props;
                return (
                  <Form>
                    <RejectedTaskForm
                      values={values}
                      close={handleClose}
                    />
                  </Form>
                )
              }}
            </Formik>
          
        </Dialog>
      </>
    }
    </>
  )
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  currentTask: getRejectedCurrentTask(state),
});

export default connect<MapStateToProps, MapDispatchToProps, {}, RootState>(mapStateToProps, {
  setRejectedCurrentTask: actions.setRejectedCurrentTask,
})(RejecedTaskFormContainer);