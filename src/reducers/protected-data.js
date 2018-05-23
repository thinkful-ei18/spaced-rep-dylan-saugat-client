import {
  FETCH_PROTECTED_DATA_SUCCESS,
  FETCH_PROTECTED_DATA_ERROR,
  VERIFY_ANSWER_REQUEST,
  VERIFY_ANSWER_SUCCESS,
  VERIFY_ANSWER_ERROR
} from '../actions/protected-data';

const initialState = {
  data: [],
  error: null,
  feedback: {},
  loading: null,
  session: {
    attempts: 0,
    correctAttempts: 0
  }
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
    return Object.assign({}, state, {
      data: action.data,
      feedback: {},
      error: null
    });
  } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  } else if (action.type === VERIFY_ANSWER_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  
  } else if (action.type === VERIFY_ANSWER_SUCCESS) {
    return Object.assign({}, state, {
      feedback: action.data,
      session: {attempts: state.session.attempts + 1, correctAttempts: state.session.correctAttempts + action.answerStatus}
    });
  } else if (action.type === VERIFY_ANSWER_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}
