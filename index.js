const express = require("express");
const path = require("path");
const {
  getTopRatedMovies,
  getMoviesByGenre,
  getMovieDetailsById,
  selectRandomMovieId,
} = require("./utils/movieUtils");
const { Movies, Genres } = require("./utils/data");

const app = express();

// Set EJS as the templating engine
app.set("view engine", "ejs");
// Set the views directory
app.set("views", path.join(__dirname, "views"));
// Serve static files from the 'public' folder
app.use(express.static("public"));

// Home page route
app.get("/", (request, response) => {
  // Render the index.ejs template
  response.render("index");
});

// Movie details route
app.get("/movie/:id", (request, response) => {
  // Get the movie ID from the URL
  const movieId = request.params.id;
  // Get the movie details
  const movie = getMovieDetailsById(movieId);

  if (movie) {
    // If the movie exists, render the details page
    response.render("movieDetails", { movie });
  } else {
    // If not, render the 404 page
    response.status(404).render("404");
  }
});

// Upcoming movies route
app.get("/upcoming", (req, res) => {
  // Get movies with null rating (upcoming)
  const upcomingMovies = Movies.filter((movie) => movie.rating === null).slice(
    0,
    5
  );
  // Render the upcoming.ejs template
  res.render("upcoming", { upcomingMovies });
});

// Top-rated movies route
app.get("/top-rated", (req, res) => {
  // Get the top 15 movies
  const topMovies = getTopRatedMovies(15);
  // Render the topRated.ejs template
  res.render("topRated", { movies: topMovies });
});

// Random movie route
app.get("/random", (req, res) => {
  // Get a random movie ID
  const randomId = selectRandomMovieId();
  // Redirect to the movie details page
  res.redirect(`/movie/${randomId}`);
});

// Handle 404 errors
app.use((req, res) => {
  // Render the 404.ejs template
  res.status(404).render("404");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
