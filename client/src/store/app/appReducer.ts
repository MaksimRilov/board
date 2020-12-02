import { Actions } from './action';

const initialState = {
  isInitialized: false,
  isFetching: [] as Array<boolean> | [],
}

const appReducer = (state = initialState, action: Actions): InitialState => {
  switch(action.type) {
    case 'APP/START_FETCH': {
      return {
        ...state,
        isFetching: [
          ...state.isFetching,
          true,
        ],
      };
    }
    case 'APP/FINISH_FETCH': {
      const index = state.isFetching.findIndex((item) => item);
      return {
        ...state,
        isFetching: [
          ...state.isFetching.filter((item, indexItem) => indexItem !== index),
        ]
      };
    }
    case 'APP/SET_INITIALIZED': {
      return {
        ...state,
        isInitialized: true,
      };
    }
    default:
      return state
  }
};

export default appReducer;

type InitialState = typeof initialState;