import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import reduxStorage from './reduxStorage';
import {appReducer} from '@/redux/slice';
import {SliceName} from '@/redux/constant';
import {languageReducer} from '../slice/language.slice';
import {userReducer} from '../slice/user.slice';
import {newFeedReducer} from '../slice/newfeed.slice';
import {myPostReducer} from '../slice/mypost.slice';
import {notiReducer} from '../slice/noti.slice';

const rootReducer: any = combineReducers({
  [SliceName.APP]: appReducer,
  [SliceName.LANGUAGE]: languageReducer,
  [SliceName.USER]: userReducer,
  [SliceName.NEW_FEED]: newFeedReducer,
  [SliceName.MY_POST]: myPostReducer,
  [SliceName.NOTI]: notiReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: reduxStorage,
  timeout: 0,
  blacklist: [],
  whitelist: [SliceName.LANGUAGE, SliceName.USER],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);

export default store;
