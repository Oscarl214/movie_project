export const TMDB_CONFIG={
    BASE_URL: 'https://api.themoviedb.org/3',  
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    },
}

export const getMovies = async ({query}: {query:string}) => {
    const endpoint = query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
    
    console.log('Fetching from endpoint:', endpoint);
    console.log('Using headers:', TMDB_CONFIG.headers);

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if(!response.ok){
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    return data;
}
// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjQ1NDUzOTI1YzRiZjY3Mjg2NGUzOTg2MThmYzA0MiIsIm5iZiI6MTc0Nzg4MDIxMi41Niwic3ViIjoiNjgyZTg5MTRiZDk3ZjJlOGQ2ZDViZWI3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.PBCm8DcKxu9pt07rtLxey0HutZL2fNwWLOlugu0mfds'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));