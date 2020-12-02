import React, { FC, useEffect } from 'react';
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import momemt from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import { RootState } from '../../store/rootReducer';
import { getPendingCurrentTask, getStatuses } from '../../store/task/selectors';
import { PendingTaskAttributes, EditPendingTask, StatusAttributes } from '../../store/task/types';
import {
  editPendingTask, actions as taskActions,
  rejectTask, fetchStatuses,
} from '../../store/task/action';
import { UserAttributes } from '../../store/user/types';
import { fetchAllUsers, actions as userActions } from '../../store/user/action';
import { getAllUsers } from '../../store/user/selectors';
import EditPendingTaskForm from '../../components/forms/EditPendingTaskForm';

type MapStateToProps = {
  currentTask: PendingTaskAttributes | null,
  users: Array<UserAttributes>,
  statuses: Array<StatusAttributes>,
};

type MapDispatchToProps = {
  setPendingCurrentTask: (taskId: null) => void,
  fetchAllUsers: () => void,
  editPendingTask: (task: EditPendingTask) => void,
  setAllUsers: (users: Array<UserAttributes>) => void,
  rejectTask: (taskId: string) => void,
  fetchStatuses: () => void,
  setStatuses: (statuses: Array<StatusAttributes>) => void,
}

type Props = MapStateToProps & MapDispatchToProps;

const validationSchema = Yup.object({
  usersId: 
    Yup.array<number>()
      .required('Поле Ответственные обязательно'),
  completionDate:
    Yup.date()
      .required('Поле Дата выполнения обязательно'),
  statusId:
    Yup.number()
      .required('Поле Статус задачи обязательно')
      .min(2, 'Статус не может быть Не рассмотрено'),
});

const EditPendingTaskFormContainer: FC<Props> = ({
  currentTask, setPendingCurrentTask,
  fetchAllUsers, users,
  editPendingTask, setAllUsers,
  rejectTask, fetchStatuses,
  statuses, setStatuses,
}) => {
  const history = useHistory();
  const { taskId } = useParams<{taskId: string}>();

  useEffect(() => {
    fetchAllUsers();
    fetchStatuses();
  }, [fetchAllUsers, fetchStatuses]);

  const handleClose = () => {
    history.replace('/pending-tasks');
    setPendingCurrentTask(null);
    setAllUsers([]);
    setStatuses([]);
  }

  const handleRejectTask = () => {
    rejectTask(taskId);
    handleClose();
  }


  return (
    <>
    { currentTask && 
      <>
        <Dialog
          open={Boolean(currentTask)}
          onClose={handleClose}
          maxWidth="md"
        >

          <DialogTitle>
            <Typography>{currentTask?.title}</Typography>
          </DialogTitle>

          <Formik
            onSubmit={(task: EditPendingTask) => {
              editPendingTask(task);
              handleClose();
            }}
            initialValues={{
              id: currentTask.id,
              title: currentTask.title,
              usersId: [] as Array<number>,
              completionDate: momemt(new Date()).format('YYYY-MM-DDThh:mm'),
              createdAt: currentTask.createdAt,
              updatedAt: currentTask.updatedAt,
              author: currentTask.author,
              email: currentTask.email,
              description: currentTask!.description,
              statusId: currentTask.statusId,
              statuses: currentTask.statuses,
            }}
            validationSchema={validationSchema}
          >
            {props => {
              const {
                values, isValid,
                setFieldValue, touched,
                errors, dirty,
                setFieldTouched,
              } = props;
              return (
                <Form>
                  <EditPendingTaskForm
                    values={values}
                    users={users}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    errors={errors}
                    setFieldTouched={setFieldTouched}
                    isValid={isValid}
                    dirty={dirty}
                    close={handleClose}
                    handleRejectTask={handleRejectTask}
                    statuses={statuses}
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
  currentTask: getPendingCurrentTask(state),
  users: getAllUsers(state),
  statuses: getStatuses(state),
});

export default connect<MapStateToProps, MapDispatchToProps, {}, RootState>(mapStateToProps, {
  setPendingCurrentTask: taskActions.setPendingCurrentTask,
  rejectTask,
  fetchAllUsers,
  editPendingTask,
  setAllUsers: userActions.setAllUsers,
  setStatuses: taskActions.setStatuses,
  fetchStatuses,
})(EditPendingTaskFormContainer);