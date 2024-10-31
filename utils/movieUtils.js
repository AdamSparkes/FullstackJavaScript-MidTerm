// utils/movieUtils.js

const { Movies, Genres } = require("./data");

/**
 * Get `x` movies by genre
 * @param {Genres} genre - The genre of the movies
 * @param {number} x - The number of movies to retrieve
 * @returns {Array.<Movies>} - An array of movies matching the genre
 */
function getMoviesByGenre(genre, x) {
  // Filter movies by genre
  const filteredMovies = Movies.filter((movie) => movie.genre === genre);
  // Get first 'x' movies
  return filteredMovies.slice(0, x);
}

/**
 * Get the `x` top rated movies, ordered by rating
 * @param {number} x - The number of top-rated movies to retrieve
 * @returns {Array.<Movies>} - An array of top-rated movies
 */
function getTopRatedMovies(x) {
  // Make a copy of movies so we don't change the original
  const moviesCopy = [...Movies];
  // Sort movies by rating from high to low
  moviesCopy.sort((a, b) => b.rating - a.rating);
  // Get the first 'x' movies
  return moviesCopy.slice(0, x);
}

/**
 * Get the details of a movie by its ID
 * @param {number} id - The ID of the movie
 * @returns {Movies} - The movie object
 */
function getMovieDetailsById(id) {
  // Find the movie with the given ID
  const movie = Movies.find((movie) => movie.id === parseInt(id, 10));
  // Return the movie or null if not found
  return movie || null;
}

/**
 * Select a random movie ID
 * @returns {number} - A random movie ID
 */
function selectRandomMovieId() {
  // Get a random index
  const randomIndex = Math.floor(Math.random() * Movies.length);
  // Get the movie at that index
  const movie = Movies[randomIndex];
  // Return the movie ID
  return movie.id;
}

/**
 * Get `x` random movies
 * @param {number} x - The number of random movies to retrieve
 * @returns {Array.<Movies>} - An array of random movies
 */
function getRandomMovies(x) {
  // Shuffle the Movies array and get first x movies
  const shuffled = [...Movies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, x);
}

// Export the functions to be used in other modules
module.exports = {
  getMoviesByGenre,
  getTopRatedMovies,
  getMovieDetailsById,
  selectRandomMovieId,
  getRandomMovies, // Added this line
};
