import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";
import createSagaMiddleware from "redux-saga";
import { middleware as thunkMiddleware } from "redux-saga-thunk";
import { Iterable } from "immutable";
import reducers from "reducers";
import rootSaga from "sagas";

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    const { createLogger } = require(`redux-logger`);

    const logger = createLogger({
      stateTransformer: state =>
        Iterable.isIterable(state) ? state.toJS() : state,
      collapsed: (getState, action, logEntry) => !logEntry.error
    });

    return composeWithDevTools(applyMiddleware(logger, ...middleware));
  }
  return applyMiddleware(...middleware);
};

function makeStore(initialState, rootReducer) {
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([thunkMiddleware, sagaMiddleware])
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga, store.dispatch);
  };

  store.runSagaTask();

  return store;
}

function configureStore(initialState) {
  const rootReducer = combineReducers({
    ...reducers
  });
  const store = makeStore(initialState, rootReducer);
  return store;
}

export default configureStore;
