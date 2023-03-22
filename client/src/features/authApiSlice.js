import { apiSlice } from '../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/users/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: '/users/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        getAllUsers: builder.query({
            query: () => `/users`
        }),
        deleteAllUsers: builder.mutation({
            query: credentials => ({
                url: '/users',
                method: 'DELETE',
                body: { ...credentials }
            })
        }),
        getUserById: builder.query({
            query: (_id) => `/users/${_id}`
        }),
        putUserById: builder.mutation({
            query:({ _id, ...credentials }) => ({
                url: `/users/${_id}`,
                method: 'PUT',
                body: { ...credentials }
            })
        }),
        deleteUserById: builder.mutation({
            query:({ _id, ...credentials }) => ({
                url: `/users/${_id}`,
                method: 'DELETE',
                body: { ...credentials }
            })
        })
    })
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetAllUsersQuery,
    useDeleteAllUsersMutation,
    useGetUserByIdQuery,
    usePutUserByIdMutation,
    useDeleteUserByIdMutation
} = authApiSlice;