import React, { FC } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { FormikTouched, FormikErrors } from 'formik';

type OwnProps = {
  values: {
    title: string,
    description: string,
    email?: string,
    author?: string,
  },
  handleChange: (any: any) => void,
  handleBlur: (any: any) => void,
  touched: FormikTouched<{
    title: string,
    description: string,
    email: string,
  }>,
  errors: FormikErrors<{
    title: string,
    description: string,
    email: string,
  }>,
  close: () => void,
  dirty: boolean,
  isValid: boolean,
};

type Props = OwnProps;

const CreateTaskForm: FC<Props> = ({
  values, handleChange,
  handleBlur, touched,
  errors, close,
  dirty, isValid,
}) => {
  return (
    <>
      <DialogContent>
        <TextField
          id="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.title ? errors.title : ''}
          error={touched.title && Boolean(errors.title)}
          autoFocus
          margin="dense"
          label="Заголовок"
          fullWidth
          required
        />

        <TextField
          id="author"
          value={values.author}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="dense"
          label="Автор"
          fullWidth
        />

        <TextField
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.email ? errors.email : ''}
          error={touched.email && Boolean(errors.email)}
          margin="dense"
          label="email"
          fullWidth
        />

        <TextField
          id="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.description ? errors.description : ''}
          error={touched.description && Boolean(errors.description)}
          multiline
          rowsMax={5}
          margin="dense"
          label="Описание"
          fullWidth
          required
        />

      </DialogContent>

      <DialogActions>
        <Button color="primary" variant="contained" type="submit" disabled={!(dirty && isValid)}>
          Создать задачу
        </Button>
        <Button color="secondary" onClick={close}>
          Отмена
        </Button>
      </DialogActions>
    </>
  )
}

export default CreateTaskForm;