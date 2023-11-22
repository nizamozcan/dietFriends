import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './Slice';

export const store = configureStore({
    reducer: {
        user: messageReducer
    }
});
