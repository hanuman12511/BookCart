import {combineReducers, applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
// import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// root reducer
import * as reducers from './redux/index';
// let middleWare = [thunkMiddleware];
const rootReducer = combineReducers(reducers);
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['availableBalance', 'deviceId', 'location'],
  stateReconciler: autoMergeLevel2,
  timeout: null,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const enhancer = compose(applyMiddleware(thunk));
const store = createStore(persistedReducer, {}, enhancer);
const persister = persistStore(store, null);
export default function configureStore() {
  return {store, persister};
}
