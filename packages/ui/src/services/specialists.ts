import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Specialist } from './types';

// Define a service using a base URL and expected endpoints
export const specialistsApi = createApi({
  reducerPath: 'specialistsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getSpecialists: builder.query<Specialist[], null>({
      query: () => `specialists`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSpecialistsQuery } = specialistsApi;
