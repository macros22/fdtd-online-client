import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { allWordsReducer } from './allWordsReducer';

const rootReducer = combineReducers({
  allWords: allWordsReducer,
});

// @ts-ignore
export const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export type RootState = ReturnType<typeof rootReducer>;
