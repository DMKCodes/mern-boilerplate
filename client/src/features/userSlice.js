import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    token: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            return ({
                ...state,
                currentUser: action.payload.user,
                token: action.payload.token
            });
        },
        clearCurrentUser: (state) => {
            return ({
                ...state,
                currentUser: null,
                token: null
            });
        },
        updateToken: (state, action) => {
            return ({
                ...state,
                token: action.payload
            });
        }
    }
});

export const userReducer = userSlice.reducer;

export const { setCurrentUser, clearCurrentUser, updateToken } = userSlice.actions;

export const selectCurrentUser = (state) => {
    return state.user.currentUser;
};

export const checkAdmin = (state) => {
    return state.user.currentUser.admin;
};

export const selectToken = (state) => {
    return state.user.token;
};