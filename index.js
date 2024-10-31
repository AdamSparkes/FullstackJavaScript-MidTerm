const express = require('express');
const path = require('path');
const { getTopRatedMovies, getMoviesByGenre, getMovieDetailsById, selectRandomMovieId } = require('./utils/movieUtils');
const { Movies, Genres } = require('./utils/data');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (request, response) => {
    response.render('index');
});


app.get('/upcoming', (req, res) => {
    // Get 5 upcoming movies (those with a null rating)
    const upcomingMovies = Movies.filter(movie => movie.rating === null).slice(0, 5);
    
    // Render the upcoming movies page
    res.render('upcoming', { upcomingMovies });
});

app.get('/movie/:id', (req, res) => {
    const movieId = req.params.id; // Get movie ID from URL
    const movie = getMovieDetailsById(movieId); // Get movie details by ID

    if (!movie) {
        return res.status(404).send("Movie not found"); // Return 404 if movie not found
    }

    // Get 3 recommended movies of the same genre, excluding the current movie
    const recommendedMovies = getMoviesByGenre(movie.genre, 3).filter(m => m.id !== movie.id);

    // Render the movie details page and pass the movie and recommendations
    res.render('movieDetails', { movie, recommendedMovies });
});


//Add remaining routes here

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
