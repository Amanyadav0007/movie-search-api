import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState(''); // State to store user input (search query)
  const [movies, setMovies] = useState([]); // State to store fetched movies
  const [loading, setLoading] = useState(false); // Loading indicator ke liye
  const [error, setError] = useState(''); // Error messages ke liye


  // Search function jo omdbapi se data fetch karega
  const searchMovie = async () => {
    if (!query) return; // agar input khali hai to, kuch na karo
    console.log(loading);
    setLoading(true); // loading start
    console.log(loading);
    setError(''); // purana error clear 

    try {
      // api ko request send karna 
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=25f7dbec`
      );

      // Here we check response (particular movie mili ya nhi)
      if (response.data.Response === 'False') {
        setError('No movies found. Try a different title.');
        setMovies([]); // list empty
      } else {
        setMovies(response.data.Search || []); // movie list set karo
      }
    } catch (err) {
      setError('Something went wrong. Please try again.'); // Agar koi error aaye related to internet/api error then show this msg
    }
    setLoading(false); // loading done
  };

  // function for clear button (sab kuch reset kardega)
  const clearSearch = () => {
    setQuery('');
    setMovies([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">🎬 Movie Explorer</h1>

        {/* Search Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter movie name"
            className="w-full sm:w-2/3 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <div className="flex gap-3">
            <button
              onClick={searchMovie}
              className="bg-amber-500 hover:bg-amber-600 px-5 py-3 rounded-lg font-semibold"
            >
              Search
            </button>
            <button
              onClick={clearSearch}
              className="bg-gray-700 hover:bg-gray-600 px-5 py-3 rounded-lg font-semibold"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Error or Loading */}
        {loading && <p className="text-center text-gray-400 mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {/* Movies Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {movies.map((movie, index) => (
            <div key={index} className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                alt={movie.Title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{movie.Title}</h2>
                <p className="text-gray-400">Year: {movie.Year}</p>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {!loading && !error && movies.length === 0 && query && (
          // <p className="text-center text-gray-500 mt-10">No movies to show.</p>
          <p className="text-center text-gray-400 mt-10">
            Please click <span className="text-amber-500 font-semibold">Search</span> to check if this movie is available.
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
