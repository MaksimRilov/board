import React, { FC, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import { RootState } from '../../store/rootReducer';
import RegisterForm from '../../components/forms/RegisterForm';
import { UserAttributes } from '../../store/user/types';
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
  isCreated: boolean,
};

type MapDispatchToProps = {
  registerUser: (user: UserAttributes) => void,
  usernameIsNotFree: (isFree: {flag: boolean, msg: null | string}) => void,
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
}) => {

  const formikRef = useRef<FormikProps<UserAttributes>>(null);

  useEffect(() => {
    formikRef.current?.resetForm();
  }, [isCreated])

  const closeDialog = () => {
    close();
    usernameIsNotFree({flag: false, msg: null})
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
        initialValues={{
          login: '',
          email: '',
          firstName: '',
          lastName: '',
          password: '',
        }}
        onSubmit={(user: UserAttributes) => {
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
})

export default connect<MapStateToProps, MapDispatchToProps, OwnProps, RootState>(mapStateToProps, {
  registerUser,
  usernameIsNotFree: actions.usernameIsNotFree,
})(RegisterFormContainer);