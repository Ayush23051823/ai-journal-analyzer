import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { searchMovies } from "../api/movies";
import { searchGames } from "../api/games";
import { EntryForm } from "../components/enrty/EntryForm";

export const AddEntry = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // State for handling API errors
  const [selectedItem, setSelectedItem] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true);
      setError(""); // Reset error on new search
      const fetchResults = async () => {
        try {
          const [movieResults, gameResults] = await Promise.all([
            searchMovies(debouncedSearchTerm),
            searchGames(debouncedSearchTerm),
          ]);
          // Combine and sort results, e.g., by year (optional but nice)
          const combinedResults = [...movieResults, ...gameResults].sort(
            (a, b) => (b.year || 0) - (a.year || 0)
          );
          setResults(combinedResults);
        } catch (err) {
          setError("Failed to fetch results. Please try again later.");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchResults();
    } else {
      setResults([]);
      setError("");
    }
  }, [debouncedSearchTerm]);

  if (selectedItem) {
    return (
      <EntryForm
        selectedItem={selectedItem}
        onBack={() => setSelectedItem(null)}
      />
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold my-4">Add an Experience</h1>
      <input
        type="text"
        placeholder="Search for a movie or game..."
        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-teal-400 focus:shadow-glow-teal focus:shadow-teal-400/50 transition-all"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        autoFocus
      />

      {/* Conditional Rendering for Loading, Error, and Results States */}
      <div className="mt-6">
        {isLoading && (
          <p className="text-center text-gray-400 animate-pulse">
            Searching...
          </p>
        )}

        {error && <p className="text-center text-red-400">{error}</p>}

        {!isLoading && !error && results.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {results.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="cursor-pointer bg-gray-800/70 hover:bg-gray-700/80 rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out border border-gray-700 w-36 sm:w-40 md:w-44"
              >
                <div className="w-full aspect-[2/3] overflow-hidden">
                  <img
                    src={item.coverUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-105"
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs sm:text-sm font-semibold text-gray-100 truncate">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {item.year || "Unknown"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading &&
          !error &&
          debouncedSearchTerm &&
          results.length === 0 && (
            <p className="text-center text-gray-500">
              No results found for "{debouncedSearchTerm}".
            </p>
          )}
      </div>
    </div>
  );
};
