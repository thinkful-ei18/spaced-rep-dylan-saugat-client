import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
  type: FETCH_PROTECTED_DATA_SUCCESS,
  data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
  type: FETCH_PROTECTED_DATA_ERROR,
  error
});

export const VERIFY_ANSWER_REQUEST = 'VERIFY_ANSWER_REQUEST';
export const verifyAnswerRequest= () => ({
  type: VERIFY_ANSWER_REQUEST,
  
});

export const VERIFY_ANSWER_SUCCESS = 'VERIFY_ANSWER_SUCCESS';
export const verifyAnswerSuccess = (data, answerStatus) => ({
  type: VERIFY_ANSWER_SUCCESS,
  data,
  answerStatus
});

export const VERIFY_ANSWER_ERROR = 'VERIFY_ANSWER_ERROR';
export const verifyAnswerError = err => ({
  type: VERIFY_ANSWER_ERROR,
  err
});

export const fetchProtectedData = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/questions`, {
    method: 'GET',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => {
      dispatch(fetchProtectedDataSuccess(data));
    })
    .catch(err => {
      dispatch(fetchProtectedDataError(err));
    });
};

export const verifyAnswerStatus = ans => (dispatch, getState) => {
dispatch(verifyAnswerRequest())
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/questions`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(ans)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => {
      if(data.feedback === "Correct"){
      dispatch(verifyAnswerSuccess(data,1));
      }
      else {
      dispatch(verifyAnswerSuccess(data,0));
      }
    })
    .catch(err => {
      dispatch(verifyAnswerError(err));
    });
};
