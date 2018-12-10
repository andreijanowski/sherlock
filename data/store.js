import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { middleware as thunkMiddleware } from "redux-saga-thunk";
import reducers from "reducers";
import rootSaga from "sagas";

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line import/no-extraneous-dependencies, global-require
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...[...middleware]));
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
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();

  return store;
}

function configureStore(initialState, { isServer }) {
  if (isServer) {
    const rootReducer = combineReducers({
      ...reducers
    });
    const store = makeStore(initialState, rootReducer);
    return store;
  }
  /* eslint-disable global-require */
  const { persistStore, persistReducer } = require("redux-persist");
  const storage = require("redux-persist/lib/storage").default;
  /* eslint-enable global-require */

  const persistConfig = {
    key: "lefood",
    whitelist: ["auth", "cart"],
    storage
  };

  const rootReducer = combineReducers({
    ...reducers
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = makeStore(initialState, persistedReducer);
  // eslint-disable-next-line no-underscore-dangle
  store.__persistor = persistStore(store);

  return store;
}

export default configureStore;
