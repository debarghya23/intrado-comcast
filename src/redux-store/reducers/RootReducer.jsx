import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthReducer from './AuthReducer';
import CommonReducer from './CommonReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

const reducers = combineReducers({
    common: CommonReducer,
    auth: AuthReducer,
});

export default persistReducer(persistConfig, reducers);