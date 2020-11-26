import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import { FormikTouched, FormikErrors } from 'formik';

import { UserAttributes } from '../../store/user/types';
import { StatusAttributes } from '../../store/task/types';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '300px',
    maxHeight: '300px',
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type OwnProps = {
  values: {
    author?: string,
    email?: string,
    completionDate: string,
    description: string,
    usersId: Array<number>,
    statusId: number,
    statuses: {
      id: number,
      name: string,
    },
    users: Array<UserAttributes>,
  },
  setFieldValue: (field: string, value: any) => void,
  setFieldTouched: (field: string, value: any) => void,
  users: Array<UserAttributes>,
  statuses: Array<StatusAttributes>,
  touched: FormikTouched<{
    usersId: Array<string>,
    completionDate: string,
    author: string,
    email: string,
    description: string,
    statusId: number,
  }>,
  errors: FormikErrors<{
    usersId: Array<string>,
    completionDate: string,
    author: string,
    email: string,
    description: string,
    statusId: number,
  }>,
  isValid: boolean,
  dirty: boolean,
  close: () => void,
  isAuth: boolean,
};

type Props = OwnProps;

const EditApprovedTaskForm: FC<Props> = ({
  values, users,
  setFieldValue, setFieldTouched,
  errors, isValid,
  dirty, touched,
  statuses, close,
  isAuth,
}) => {
  const classes = useStyles();

  const handleChangeSelect = (event: React.ChangeEvent<{ value: unknown }>, name: string) => {
    setFieldValue(name, event.target.value);
  }

  const handleBlurSelect = (event: React.ChangeEvent<{ value: unknown }>, name: string) => {
    setFieldTouched(name, event.target.value);
  }

  return (
    <>
      <DialogContent classes={{root: classes.dialogPaper}}>
        <Grid container spacing={3}>

          <Grid item xs={6}>
            <TextField
              id="author"
              value={values.author}
              margin="dense"
              label="Автор"
              fullWidth
              disabled
            />

            <TextField
              id="email"
              value={values.email}
              margin="dense"
              label="Email"
              fullWidth
              disabled
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="description"
              value={values.description}
              multiline
              rowsMax={5}
              margin="dense"
              label="Описание"
              fullWidth
              required
              disabled
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl
              fullWidth
              required
              error={touched.usersId && Boolean(errors.usersId)}
              margin="dense"
              disabled={!isAuth}
            >
              <InputLabel>Ответственные</InputLabel>
              <Select
                id="usersId"
                multiple
                value={values.usersId}
                input={<Input />}
                renderValue={
                  (selected) => {
                    if (isAuth) {
                      const filteredValues = users.filter((user => (selected as number[]).find((s) => user.id === s)));
                      const names = filteredValues.map((v) => `${v.firstName} ${v.lastName}`).join(', ');
                      return names;
                    } else {
                      const filteredValues = values.users.filter((user => (selected as number[]).find((s) => user.id === s)));
                      const names = filteredValues.map((v) => `${v.firstName} ${v.lastName}`).join(', ');
                      return names;
                    }
                }}
                onChange={(e) => handleChangeSelect(e, 'usersId')}
                onBlur={(e) => handleBlurSelect(e, 'usersId')}
                MenuProps={MenuProps}
              >

                {isAuth
                  ? users.map((user) => (
                    <MenuItem
                      key={user.id}
                      value={user.id}
                    >
                      <Checkbox checked={values.usersId.indexOf(user.id) > -1} />
                    <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                    </MenuItem>))
                  : values.users.map((user) => (
                    <MenuItem
                      key={user.id}
                      value={user.id}
                    >
                      <Checkbox checked={values.usersId.indexOf(user.id) > -1} />
                    <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                    </MenuItem>))
                }
              </Select>
              {touched.usersId ? <FormHelperText>{errors.usersId}</FormHelperText> : ''}
            </FormControl>
          </Grid>

          <Grid item xs={6}>
              <TextField
                id="completionDate"
                type="datetime-local"
                value={values.completionDate}
                onChange={(e) => handleChangeSelect(e, 'completionDate')}
                onBlur={(e) => handleBlurSelect(e, 'completionDate')}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="dense"
                label="Дата выполнения"
                fullWidth
                required
                disabled={!isAuth}
              />
          </Grid>

          <Grid item xs={4}>
            <FormControl
              fullWidth
              required
              error={touched.statusId && Boolean(errors.statusId)}
              margin="dense"
              disabled={!isAuth}
            >
              <InputLabel>Статус задачи</InputLabel>
              <Select
                id="statusId"
                value={values.statusId}
                onChange={(e) => handleChangeSelect(e, 'statusId')}
                onBlur={(e) => handleBlurSelect(e, 'statusId')}
              >
                {isAuth
                  ? statuses.map((status) => (
                    <MenuItem key={status.id} value={status.id}>
                      <ListItemText>{status.name}</ListItemText>
                    </MenuItem>))
                  : <MenuItem value={values.statuses.id}>
                      <ListItemText>{values.statuses.name}</ListItemText>
                    </MenuItem>
                }
              </Select>
              {touched.statusId ? <FormHelperText>{errors.statusId}</FormHelperText> : ''}
            </FormControl>
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        {isAuth && 
          <Button color="primary" variant="contained" type="submit" disabled={!(dirty && isValid)}>
            Изменить
          </Button>
        }
        <Button color="secondary" onClick={close}>
          Закрыть
        </Button>
      </DialogActions>
    </>
  )
}

export default EditApprovedTaskForm;