import React, { FC } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { FormikTouched, FormikErrors } from 'formik';

type OwnProps = {
  values: {
    login: string,
    email: string,
    firstName: string,
    lastName: string,
    password?: string,
  },
  handleChange: (any: any) => void,
  handleBlur: (any: any) => void,
  touched: FormikTouched<{
    login: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  }>,
  errors: FormikErrors<{
    login: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  }>,
  close: () => void,
  dirty: boolean,
  isValid: boolean,
};

type Props = OwnProps;

const RegisterForm: FC<Props> = ({
  values, handleChange,
  handleBlur, touched,
  errors, close,
  dirty, isValid,
}) => {
  return (
    <>
      <DialogContent>
        <TextField
          id="login"
          value={values.login}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.login ? errors.login : ''}
          error={touched.login && Boolean(errors.login)}
          autoFocus
          margin="dense"
          label="Логин"
          fullWidth
          required
        />

        <TextField
          id="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.email ? errors.email : ''}
          error={touched.email && Boolean(errors.email)}
          margin="dense"
          label="E-mail"
          fullWidth
          required
        />

        <TextField
          id="firstName"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.firstName ? errors.firstName : ''}
          error={touched.firstName && Boolean(errors.firstName)}
          margin="dense"
          label="Имя"
          fullWidth
          required
        />

        <TextField
          id="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.lastName ? errors.lastName : ''}
          error={touched.lastName && Boolean(errors.lastName)}
          margin="dense"
          label="Фамилия"
          fullWidth
          required
        />

        <TextField
          id="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.password ? errors.password : ''}
          error={touched.password && Boolean(errors.password)}
          margin="dense"
          label="Пароль"
          fullWidth
          required
        />
      </DialogContent>

      <DialogActions>
        <Button color="primary" variant="contained" type="submit" disabled={!(dirty && isValid)}>
          Добавить администратора
        </Button>
        <Button color="secondary" onClick={close}>
          Отмена
        </Button>
      </DialogActions>
    </>
  )
}

export default RegisterForm;