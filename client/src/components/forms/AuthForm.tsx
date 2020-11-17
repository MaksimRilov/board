import React, { FC } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { FormikTouched, FormikErrors } from 'formik';

type OwnProps = {
  values: {
    username: string,
    password: string,
  },
  handleChange: (any: any) => void,
  handleBlur: (any: any) => void,
  touched: FormikTouched<{
    username: string,
    password: string,
  }>,
  errors: FormikErrors<{
    username: string,
    password: string,
  }>,
  close: () => void,
  dirty: boolean,
  isValid: boolean,
};

type Props = OwnProps;

const AuthForm: FC<Props> = ({
  values, handleChange,
  handleBlur, touched,
  errors, close,
  dirty, isValid,
}) => {
  return (
    <>
      <DialogContent>
        <TextField
          id="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.username ? errors.username : ''}
          error={touched.username && Boolean(errors.username)}
          autoFocus
          margin="dense"
          label="Логин или email"
          fullWidth
        />

        <TextField 
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.password ? errors.password : ''}
          error={touched.password && Boolean(errors.password)}
          margin="dense"
          label="Пароль"
          type="password"
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button color="primary" type="submit" disabled={!(dirty && isValid)}>
          Авторизоваться
        </Button>
        <Button color="secondary" onClick={close}>
          Отмена
        </Button>
      </DialogActions>
    </>
  )
}

export default AuthForm;