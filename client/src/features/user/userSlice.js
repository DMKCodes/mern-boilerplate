import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    isAdmin: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            return ({
                ...state,
                currentUser: action.payload
            });
        },
        setAdmin: (state, action) => {
            return ({
                ...state,
                isAdmin: action.payload
            });
        }
    }
});

export const userReducer = userSlice.reducer;

export const { setCurrentUser, setAdmin } = userSlice.actions;

export const selectCurrentUser = (state) => {
    return state.user.currentUser;
};

export const checkAdmin = (state) => {
    return state.user.isAdmin;
};