export const SET_ANSWER = 'SET_ANSWER';
export const setAnswer = (answer) => ({
  type: SET_ANSWER,
  answer
});

export const RESET_GAME = 'RESET_GAME';
export const resetGame = (answer) => ({
  type: RESET_GAME,
  answer
});
