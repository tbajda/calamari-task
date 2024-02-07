import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Specialist } from 'specialist-types';

// Define a service using a base URL and expected endpoints
export const specialistsApi = createApi({
  reducerPath: 'specialistsApi',
  tagTypes: ['Favorites'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getSpecialists: builder.query<Specialist[], null>({
      query: () => `all-favorite`,
    }),
    getFavorites: builder.query<Specialist[], null>({
      query: () => `my-specialists`,
      providesTags: ['Favorites'],
    }),
    addToFavorite: builder.mutation<void, string>({
      query: (id) => ({
        url: `favorites/add/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Favorites'],
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          specialistsApi.util.updateQueryData('getSpecialists', null, (draft) => {
            const newData = draft.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  isFavorite: true,
                };
              }
              return item;
            });

            return newData;
          }),
        );

        queryFulfilled.catch(patchResult.undo);
      },
    }),
    removeFromFavorites: builder.mutation<void, string>({
      query: (id) => ({
        url: `favorites/remove/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Favorites'],
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          specialistsApi.util.updateQueryData('getSpecialists', null, (draft) => {
            const newData = draft.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  isFavorite: false,
                };
              }
              return item;
            });

            return newData;
          }),
        );

        queryFulfilled.catch(patchResult.undo);
      },
    }),
    vote: builder.mutation<void, { id: string; vote: number }>({
      query: ({ id, vote }) => ({
        url: `vote/${id}`,
        method: 'PATCH',
        body: {
          vote,
        },
      }),
      onQueryStarted({ id, vote }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          specialistsApi.util.updateQueryData('getSpecialists', null, (draft) => {
            const newData = draft.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  userVote: vote,
                  votes: [...item.votes, vote],
                };
              }
              return item;
            });

            return newData;
          }),
        );

        const patchFavoritesResult = dispatch(
          specialistsApi.util.updateQueryData('getFavorites', null, (draft) => {
            const newData = draft.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  userVote: vote,
                  votes: [...item.votes, vote],
                };
              }
              return item;
            });

            return newData;
          }),
        );

        queryFulfilled.catch(patchResult.undo);
        queryFulfilled.catch(patchFavoritesResult.undo);
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSpecialistsQuery,
  useGetFavoritesQuery,
  useAddToFavoriteMutation,
  useRemoveFromFavoritesMutation,
  useVoteMutation,
} = specialistsApi;
