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
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';

import { UserAttributes } from '../../store/user/types';


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
  close: () => void,
};

type Props = OwnProps;

const RejectedTaskForm: FC<Props> = ({
  values, close,
}) => {
  const classes = useStyles();

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
              margin="dense"
              disabled
            >
              <InputLabel>Ответственные</InputLabel>
              <Select
                id="usersId"
                multiple
                value={values.usersId}
                input={<Input />}
                renderValue={
                  (selected) => {
                    const filteredValues = values.users.filter((user => (selected as number[]).find((s) => user.id === s)));
                    const names = filteredValues.map((v) => `${v.firstName} ${v.lastName}`).join(', ');
                    return names;
                }}
                MenuProps={MenuProps}
              >
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
                id="completionDate"
                type="datetime-local"
                value={values.completionDate}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="dense"
                label="Дата выполнения"
                fullWidth
                required
                disabled
              />
          </Grid>

          <Grid item xs={4}>
            <FormControl
              fullWidth
              required
              margin="dense"
              disabled
            >
              <InputLabel>Статус задачи</InputLabel>
              <Select
                id="statusId"
                value={values.statusId}
              >
                <MenuItem value={values.statuses.id}>
                  <ListItemText>{values.statuses.name}</ListItemText>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button color="secondary" onClick={close}>
          Закрыть
        </Button>
      </DialogActions>
    </>
  )
}

export default RejectedTaskForm;