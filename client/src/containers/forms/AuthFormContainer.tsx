import React, { FC, useEffect } from 'react';
import { connect } from "react-redux";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import AuthForm from '../../components/forms/AuthForm';
import { RootState } from '../../store/rootReducer';
import { loginUser, actions } from '../../store/user/action';
import { getIsBadLoginData, getIsAuth } from '../../store/user/selectors';

type OwnProps = {
  open: boolean,
  close: () => void,
};

type MapStateToProps = {
  isBadLoginData: boolean,
  isAuth: boolean,
};

type MapDispatchToProps = {
  loginUser: (loginDate: { username: string, password: string }) => void,
  badLoginData: (isBad: boolean) => void,
};

type Props = OwnProps & MapStateToProps & MapDispatchToProps;

const validationSchema = Yup.object({
  username: 
    Yup.string()
      .required('Поле email или Логин обязательно'),
  password:
    Yup.string()
      .required('Поле Пароль обязательно'),
});

const AuthFormContainer: FC<Props> = ({
  open, close,
  loginUser, isBadLoginData,
  badLoginData, isAuth
}) => {

  useEffect(() => {
    if (isAuth) {
      close();
    }
  }, [isAuth, close])

  const closeDialog = () => {
    close();
    badLoginData(false);
  }

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
    >

      <DialogTitle>
        <Typography>Авторизация</Typography>
        { isBadLoginData ? <Typography color="error">Логин или пароль не подходит</Typography> : null }
      </DialogTitle>

      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(user) => {
          loginUser(user);
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
              <AuthForm
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
  isBadLoginData: getIsBadLoginData(state),
  isAuth: getIsAuth(state),
})

export default connect<MapStateToProps, MapDispatchToProps, OwnProps, RootState>(mapStateToProps, {
  loginUser,
  badLoginData: actions.badLoginData
})(AuthFormContainer);