import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import authReducer from './reducers/auth';
import protectedDataReducer from './reducers/protected-data';
import gameReducer from './reducers/game';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const middlewares = [thunk];
let enhancers;


if (process.env.NODE_ENV === 'development') {
  
    enhancers = compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    );
  } else {
    enhancers = applyMiddleware(...middlewares)
  }
  

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        protectedData: protectedDataReducer,
        game: gameReducer
    }),
    {},
    enhancers
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;
