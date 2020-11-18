import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';

import userReducer from './user/userReducer';
import taskReducer from './task/taskReducer';

const rootReducer = combineReducers({
  userReducer,
  taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type InferActions<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;

export type BaseThunk<A extends Action = Action, R = Promise<void>> = ThunkAction<R, RootState, unknown, A>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = composeEnhancers(applyMiddleware(thunkMiddleware))(createStore)(rootReducer);

export default store;