import React from "react";
import {connect} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { RootState } from '../store/rootReducer';
import { getIsFetching } from '../store/app/selectors';

const useStyles = makeStyles({
  container: {
    zIndex: 1500,
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    backgroundColor: 'white',
    opacity: '0.6',
  },
  position: {
    position: 'absolute',
    top: '100px',
    left: '50%',
    marginLeft: '-2.5rem',
  },
});

const mapStateToProps = (state: RootState): MapStateToProps => ({
  isFetching: getIsFetching(state),
});

type MapStateToProps = {
  isFetching: Array<boolean>,
};

export function withLoader<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  const LoaderComponent: React.FC<MapStateToProps & {}> = ({
    isFetching, ...restProps }) => {
      const classes = useStyles();
      return (
        <>
          <WrappedComponent {...restProps as WCP}/>
          {
            isFetching.length > 0 && (
              <div className={classes.container}>
                <div className={classes.position}>
                  <CircularProgress size="5rem" />
                </div>
              </div>
            )
          }
        </>
      )
    };

    const ConnectedLoaderComponent =  connect<MapStateToProps, {}, WCP, RootState>(
      mapStateToProps,
      {})(LoaderComponent);

    return ConnectedLoaderComponent;
};