import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { clearCurrentUser, updateToken } from '../../features/userSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().user.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    console.log("Base query result:", result);

    if (result?.error?.status === 401) {
        console.log('Sending refresh token...');
        const refreshResult = await baseQuery({ url: '/refresh' }, api, extraOptions);
        console.log("Refresh result:", refreshResult);

        if (refreshResult?.data?.token) {
            api.dispatch(updateToken(refreshResult.data.token));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(clearCurrentUser());
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
});