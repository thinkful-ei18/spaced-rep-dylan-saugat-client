import { SET_ANSWER, RESET_GAME } from '../actions/game';

const initialState = {
  answer: ''
};

export default function reducer(state = initialState, action) {

  if (action.type === SET_ANSWER) {
    return Object.assign({}, state, {answer: action.answer});
  } else if (action.type === RESET_GAME) {
    return Object.assign({}, state, {answer: ''});
  }
return state;
}
