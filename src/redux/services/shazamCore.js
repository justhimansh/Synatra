import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

    export const shazamCoreApi = createApi({
        reducerPath: 'shazamCoreApi',
        baseQuery: fetchBaseQuery({
            baseUrl: 'https://shazam-core.p.rapidapi.com/',
            prepareHeaders: (headers) =>{
            headers.set('X-RapidAPI-Key', '5a0d0a5429msh23e34aae7a1e62ep1458d5jsnc870404c1ee1');
            return headers;
        },
        }),
        endpoints: (builder) => ({
            getTopCharts: builder.query({query: () => 'v1/charts/world'}),
            getSongsByGenre: builder.query({query: (genre) => `v1/charts/genre-world?genre_code=${genre}`}),
            getSongDetails: builder.query({query: ({ songid }) =>  `v1/tracks/details?track_id=${songid}`}),
            getSongRelated: builder.query({query: ({ songid}) =>  `v1/tracks/related?track_id=${songid}`}),
            getSongMusicVideo: builder.query ({query: ({ songid, names }) => `v1/tracks/youtube-video?track_id=${songid}&name=${names}`}),
            getArtistDetails: builder.query({ query: (artistId) => `v2/artists/details?artist_id=${artistId}` }),
            getSongsByCountry: builder.query({query: (countryCode) => `v1/charts/country?country_code=${countryCode}`}),
            getSongsBySearch: builder.query({query: (searchTerm) => `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`})
        }),
    });

    export const {
        useGetTopChartsQuery,
        useGetSongsByGenreQuery,
        useGetSongDetailsQuery,
        useGetSongRelatedQuery,
        useGetSongMusicVideoQuery,
        useGetArtistDetailsQuery,
        useGetSongsByCountryQuery,
        useGetSongsBySearchQuery
    } = shazamCoreApi;