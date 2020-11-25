import React, { FC, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import { RootState } from '../../store/rootReducer';
import RegisterForm from '../../components/forms/RegisterForm';
import { NewUserAttributes } from '../../store/user/types';
import { registerUser, actions } from '../../store/user/action';
import { getUsernameIsFree, userIsCreated } from '../../store/user/selectors';

type OwnProps = {
  open: boolean,
  close: () => void,
};

type MapStateToProps = {
  isFree: {
    flag: boolean,
    msg: null | string,
  },
  isCreated: number | null,
};

type MapDispatchToProps = {
  registerUser: (user: NewUserAttributes) => void,
  usernameIsNotFree: (isFree: {flag: boolean, msg: null | string}) => void,
  userWasCreated: (isCreated: number | null) => void,
};

type Props = OwnProps & MapStateToProps & MapDispatchToProps;

const validationSchema = Yup.object({
  login:
    Yup.string()
      .required('Поле Логин обязательно'),
  email: Yup.string()
      .required('Поле E-mail обязательно')
      .email('Поле E-mail не валидно'),
  firstName:
    Yup.string()
      .required('Поле Имя обязательно'),
  lastName:
    Yup.string()
      .required('Поле Фамилия обязательно'),
  password:
    Yup.string()
      .required('Поле Пароль обязательно'),
});

const RegisterFormContainer:FC<Props> = ({
  open, close,
  registerUser, isFree,
  usernameIsNotFree, isCreated,
  userWasCreated,
}) => {

  const formikRef = useRef<FormikProps<NewUserAttributes>>(null);

  useEffect(() => {
    formikRef.current?.resetForm();
  }, [isCreated])

  const closeDialog = (): void => {
    close();
    usernameIsNotFree({flag: false, msg: null});
    userWasCreated(null);
  }


  return (
    <Dialog
      open={open}
      onClose={closeDialog}
    >

      <DialogTitle>
        <Typography>Добавить администратора</Typography>
        {isFree.flag ? <Typography color="error">{isFree.msg}</Typography> : null}
        {isCreated ? <Typography color="primary">
            Администратор успешно добавлен.
            Для создания нового администратора заполните форму.
            Для выхода, нажмите кнопку Отмена
          </Typography>
        : null}
      </DialogTitle>

      <Formik
        innerRef={formikRef}
        initialValues={{
          login: '',
          email: '',
          firstName: '',
          lastName: '',
          password: '',
        }}
        onSubmit={(user: NewUserAttributes) => {
          registerUser(user);
        }}
        validationSchema={validationSchema}
      >
        {props => {
          const {
            values, touched,
            errors, dirty,
            handleChange, isValid,
            handleSubmit, handleBlur
          } = props;
          return (
            <Form onSubmit={handleSubmit}>
              <RegisterForm 
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
  isFree: getUsernameIsFree(state),
  isCreated: userIsCreated(state),
});

export default connect<MapStateToProps, MapDispatchToProps, OwnProps, RootState>(mapStateToProps, {
  registerUser,
  usernameIsNotFree: actions.usernameIsNotFree,
  userWasCreated: actions.userWasCreated,
})(RegisterFormContainer);