import React, { FC, useRef, useEffect } from 'react';
import { connect } from "react-redux";
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import CreateTaskForm from '../../components/forms/CreateTaskForm';
import { TaskAttributes } from '../../store/task/types';
import { RootState } from '../../store/rootReducer';
import { taskIsCreated } from '../../store/task/selectors';
import { createTask, actions } from '../../store/task/action';

type OwnProps = {
  open: boolean,
  close: () => void,
};

type MapStateToProps = {
  isCreated: number | null,
};

type MapDispatchToProps = {
  createTask: (task: TaskAttributes) => void,
  taskWasCreated: (isCreated: number | null) => void,
};

type Props = OwnProps & MapStateToProps & MapDispatchToProps;

const validationSchema = Yup.object({
  title: 
    Yup.string()
      .required('Поле Заголовок обязательно'),
  description:
    Yup.string()
      .required('Поле Описание обязательно'),
  email: Yup.string()
    .email('Поле E-mail не валидно'),
});

const CreateTaskFormContainer: FC<Props> = ({
  open, close,
  isCreated, createTask,
  taskWasCreated,
}) => {

  const formikRef = useRef<FormikProps<TaskAttributes>>(null);

  useEffect(() => {
    formikRef.current?.resetForm();
  }, [isCreated]);

  const closeDialog = (): void => {
    close();
    taskWasCreated(null);
  }

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
    >

      <DialogTitle>
        <Typography>Предложить улучшение</Typography>
        {isCreated ? <Typography color="primary">
            Задача успешно создана.
            Для создания новой задачи заполните форму.
            Для выхода, нажмите кнопку Отмена
          </Typography>
        : null}
      </DialogTitle>

      <Formik
        innerRef={formikRef}
        initialValues={{
          title: '',
          description: '',
          email: '',
          author: '',
          completionDate: new Date(),
        }}
        onSubmit={(task: TaskAttributes) => {
          createTask({
            ...task,
            completionDate: new Date(),
          });
        }}
        validationSchema={validationSchema}
      >
        {props => {
          const {
            values, touched,
            errors, dirty,
            handleChange, isValid,
            handleSubmit, handleBlur,
          } = props;
          return (
            <Form onSubmit={handleSubmit}>
              <CreateTaskForm
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
                close={closeDialog}
                dirty={dirty}
                isValid={isValid}
              />
            </Form>
          )
        }}
      </Formik>

    </Dialog>
  )
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  isCreated: taskIsCreated(state),
})

export default connect<MapStateToProps, MapDispatchToProps, OwnProps, RootState>(mapStateToProps, {
  createTask,
  taskWasCreated: actions.taskWasCreated,
})(CreateTaskFormContainer);