// movies.js
import { getSmartSearchKeywords } from './ai'; // AI helper

// TMDb base image URL
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const searchMovies = async (rawQuery) => {
  if (!rawQuery) return [];

  try {
    // 1️⃣ Get AI-processed keywords
    const query = await getSmartSearchKeywords(rawQuery);
    console.log('Final query sent to TMDb:', query); // frontend log

    // 2️⃣ Call TMDb API
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to fetch movies from TMDb');

    const data = await response.json();

    // 3️⃣ Transform TMDb data into app-friendly format
    return data.results.map(movie => ({
      id: `tmdb-${movie.id}`, // prefix to avoid ID collisions
      title: movie.title,
      type: 'movie',
      coverUrl: movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : 'https://placehold.co/400x600/1a202c/ffffff?text=No+Image',
      year: movie.release_date ? parseInt(movie.release_date.split('-')[0]) : null,
    }));
  } catch (error) {
    console.error('TMDb API Error:', error);
    return []; // fail gracefully
  }
};
