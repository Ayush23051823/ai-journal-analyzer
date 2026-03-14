// Your API key is securely accessed from the environment variables
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export const searchGames = async (query) => {
  if (!query) return [];

  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch games from RAWG');
    }
    const data = await response.json();

    // IMPORTANT: We transform the API data into the format our app expects
    return data.results.map(game => ({
      id: `rawg-${game.id}`, // Add a prefix to avoid ID collisions
      title: game.name,
      type: 'game',
      coverUrl: game.background_image || 'https://placehold.co/400x600/1a202c/ffffff?text=No+Image',
      year: game.released ? parseInt(game.released.split('-')[0]) : null,
    }));
    
  } catch (error) {
    console.error("RAWG API Error:", error);
    return []; // Return an empty array on error
  }
};