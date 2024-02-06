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
    addToFavorite: builder.mutation<void, Pick<Specialist, 'id'> & Partial<Specialist>>({
      query: ({ id }) => ({
        url: `specialists/add-to-favorite/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Favorites'],
      onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          specialistsApi.util.updateQueryData('getSpecialists', null, (draft) => {
            const index = draft.findIndex((it) => it.id === id);

            draft[index].isFavorite = true;

            return draft;
          }),
        );

        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSpecialistsQuery, useGetFavoritesQuery, useAddToFavoriteMutation } = specialistsApi;
