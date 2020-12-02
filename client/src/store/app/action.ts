import { InferActions } from '../rootReducer';

export const actions = {
  startFetch: () => ({
    type: 'APP/START_FETCH',
  } as const),
  finishFetch: () => ({
    type: 'APP/FINISH_FETCH',
  } as const),
  setInitialized: () => ({
    type: 'APP/SET_INITIALIZED'
  } as const),
}

export type Actions = InferActions<typeof actions>;