import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withAuthRedirect } from '../../hoc/withAuthRedirect';

const NewTaskContainer = () => {
  return (
    <div>NEW TASK</div>
  )
}

export default compose<React.ComponentType>(
  withAuthRedirect,
)(NewTaskContainer);