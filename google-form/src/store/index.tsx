import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reviewing from './reviewing';
import naming from './naming';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['reviewing', 'naming'],
};

const rootReducer = combineReducers({
  reviewing,
  naming,
});

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
