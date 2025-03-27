import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import  {userReducer,dataReducer} from './userslice';

import { persistReducer } from 'redux-persist';

const persistConfig={
    key:'root',
    version:1,
    storage,
    timeout: 10000,
};

const reducer=combineReducers({
    user:userReducer,
    data:dataReducer,
});
 const persistedReducer=persistReducer(persistConfig,reducer);

 export default persistedReducer;