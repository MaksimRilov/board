import React, { FC, useEffect } from 'react';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import momemt from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import EditApprovedTaskForm from '../../components/forms/EditApprovedTaskForm';
import { RootState } from '../../store/rootReducer';
import { ApprovedTaskAttributes, StatusAttributes } from '../../store/task/types'
import { getApprovedCurrentTask, getStatuses } from '../../store/task/selectors'
import { fetchStatuses, actions as taskActions, editApprovedTask } from '../../store/task/action';
import { UserAttributes } from '../../store/user/types';
import { getAllUsers, getIsAuth } from '../../store/user/selectors';
import { fetchAllUsers, actions as userActions } from '../../store/user/action';

type MapStateToProps = {
  currentTask: ApprovedTaskAttributes | null
  users: Array<UserAttributes>
  statuses: Array<StatusAttributes>,
  isAuth: boolean,
};

type MapDispatchToProps = {
  fetchAllUsers: () => void,
  fetchStatuses: () => void,
  setApprovedCurrentTask: (taskId: null) => void,
  setStatuses: (statuses: Array<StatusAttributes>) => void,
  setAllUsers: (users: Array<UserAttributes>) => void,
  editApprovedTask: (task: ApprovedTaskAttributes) => void,
};

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

const EditApprovedTaskFormContainer: FC<Props> = ({
  currentTask, fetchAllUsers,
  fetchStatuses, users,
  statuses, setApprovedCurrentTask,
  setStatuses, setAllUsers,
  editApprovedTask, isAuth,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (isAuth) {
      fetchAllUsers();
      fetchStatuses();
    }
  }, [isAuth]);

  const handleClose = () => {
    history.replace('/approved-tasks');
    setApprovedCurrentTask(null);
    setStatuses([]);
    setAllUsers([]);
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
              onSubmit={(task: ApprovedTaskAttributes) => {
                editApprovedTask(task);
                handleClose();
              }}
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
              validationSchema={validationSchema}
            >
              {props => {
                const {
                  values, setFieldValue,
                  setFieldTouched, isValid,
                  touched, errors,
                  dirty,
                } = props;
                return (
                  <Form>
                    <EditApprovedTaskForm
                      values={values}
                      users={users}
                      statuses={statuses}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      isValid={isValid}
                      touched={touched}
                      errors={errors}
                      dirty={dirty}
                      close={handleClose}
                      isAuth={isAuth}
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
  currentTask: getApprovedCurrentTask(state),
  users: getAllUsers(state),
  statuses: getStatuses(state),
  isAuth: getIsAuth(state),
});

export default connect<MapStateToProps, MapDispatchToProps, {}, RootState>(mapStateToProps, {
  fetchStatuses,
  fetchAllUsers,
  setApprovedCurrentTask: taskActions.setApprovedCurrentTask,
  setStatuses: taskActions.setStatuses,
  setAllUsers: userActions.setAllUsers,
  editApprovedTask,
})(EditApprovedTaskFormContainer);