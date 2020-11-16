import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import AuthForm from '../../components/forms/AuthForm';

type OwnProps = {
  open: boolean,
  close: () => void,
};

type Props = OwnProps;

export const validationSchema = Yup.object({
  username: 
    Yup.string()
      .required('Поле email или Логин обязательно'),
  password:
    Yup.string()
      .required('Поле Пароль обязательно'),
});

const AuthFormContainer: FC<Props> = ({
  open, close,
}) => {
  return (
    <Dialog
      open={open}
      onClose={close}
    >

      <DialogTitle>Авторизация</DialogTitle>

      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={() => {
          alert('LOGIN')
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
                close={close}
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

export default AuthFormContainer;