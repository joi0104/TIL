import { createAction, handleActions } from 'redux-actions';

const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initialState = {
  number: 0,
};

const counter = handleActions(
  {
    [INCREASE]: (state) => ({ number: state.number + 1 }),
    [DECREASE]: (state) => ({ number: state.number - 1 }),
  },
  initialState,
);

export default counter;
