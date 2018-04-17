import { SET_ANSWER } from '../actions/game';

const initialState = {
  answer: ''
};

export default function reducer(state = initialState, action) {

  if (action.type === SET_ANSWER) {
    return Object.assign({}, state, {answer: action.answer});
  }
return state;
}
