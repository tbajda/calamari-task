import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Filters, ListResponse, Specialist } from 'specialist-types';

export const specialistsApi = createApi({
  reducerPath: 'specialistsApi',
  tagTypes: ['Favorites'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getSpecialists: builder.query<ListResponse<Specialist>, Filters>({
      query: ({ search, page }) => ({
        url: `all-favorite?page=${page}&search=${search}`,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getFavorites: builder.query<ListResponse<Specialist>, Filters>({
      query: ({ search, page }) => ({
        url: `my-specialists?page=${page}&search=${search}`,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
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
          specialistsApi.util.updateQueryData('getSpecialists', {}, (draft) => {
            const newData = draft.response.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  isFavorite: true,
                };
              }
              return item;
            });

            return {
              ...draft,
              response: newData,
            };
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
          specialistsApi.util.updateQueryData('getSpecialists', {}, (draft) => {
            const newData = draft.response.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  isFavorite: false,
                };
              }
              return item;
            });

            return {
              ...draft,
              response: newData,
            };
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
          specialistsApi.util.updateQueryData('getSpecialists', {}, (draft) => {
            const newData = draft.response.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  userVote: vote,
                  votes: [...item.votes, vote],
                };
              }
              return item;
            });

            return {
              ...draft,
              response: newData,
            };
          }),
        );

        const patchFavoritesResult = dispatch(
          specialistsApi.util.updateQueryData('getFavorites', {}, (draft) => {
            const newData = draft.response.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  userVote: vote,
                  votes: [...item.votes, vote],
                };
              }
              return item;
            });

            return {
              ...draft,
              response: newData,
            };
          }),
        );

        queryFulfilled.catch(patchResult.undo);
        queryFulfilled.catch(patchFavoritesResult.undo);
      },
    }),
  }),
});

export const {
  useGetSpecialistsQuery,
  useGetFavoritesQuery,
  useAddToFavoriteMutation,
  useRemoveFromFavoritesMutation,
  useVoteMutation,
} = specialistsApi;
