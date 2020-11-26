import React from "react";
import { Redirect } from "react-router-dom";
import {connect} from "react-redux";

import { RootState } from '../store/rootReducer';
import { getIsAuth } from '../store/user/selectors';

const mapStateToPropsForRedirect = (state: RootState) => ({
  isAuth: getIsAuth(state),
});

type MapStateToProps = {
  isAuth: boolean,
};

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapStateToProps & {}> = (props) => {
    const { isAuth, ...restProps } = props;
    
    if (!isAuth) return <Redirect to="/approved-tasks" />
 
    return <WrappedComponent {...restProps as WCP} />
  }

  const ConnectedAuthRedirectComponent = connect<MapStateToProps, {}, WCP, RootState>(
    mapStateToPropsForRedirect,
    {},
  )(RedirectComponent);

  return ConnectedAuthRedirectComponent;
}