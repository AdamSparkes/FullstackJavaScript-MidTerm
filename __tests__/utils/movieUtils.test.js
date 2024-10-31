// __tests__/utils/movieUtils.test.js

const { expect } = require('chai');
const { Genres } = require('../../utils/data');
const {
  getMoviesByGenre,
  getTopRatedMovies,
  getMovieDetailsById,
  selectRandomMovieId,
} = require('../../utils/movieUtils');

describe('Movie Utility Functions', () => {
  describe('getMoviesByGenre', () => {
    it('should return x movies of the specified genre', () => {
      const genre = Genres.ACTION;
      const x = 3;
      const movies = getMoviesByGenre(genre, x);
      expect(movies).to.be.an('array').that.has.lengthOf(x);
      movies.forEach((movie) => {
        expect(movie.genre).to.equal(genre);
      });
    });

    it('should return an empty array if the genre has no movies', () => {
      const genre = 'Paul Blart Mall Cop';
      const x = 5;
      const movies = getMoviesByGenre(genre, x);
      expect(movies).to.be.an('array').that.is.empty;
    });
  });

  describe('getTopRatedMovies', () => {
    it('should return top-rated movies, ordered by rating', () => {
      const x = 5;
      const movies = getTopRatedMovies(x);
      expect(movies).to.be.an('array').that.has.lengthOf(x);
      for (let i = 0; i < movies.length - 1; i++) {
        expect(movies[i].rating).to.be.at.least(movies[i + 1].rating);
      }
    });
  });

  describe('getMovieDetailsById', () => {
    it('should return movie details for a valid ID', () => {
      const id = 1;
      const movie = getMovieDetailsById(id);
      expect(movie).to.be.an('object');
      expect(movie.id).to.equal(id);
    });

    it('should return null for an invalid ID', () => {
      const id = 999;
      const movie = getMovieDetailsById(id);
      expect(movie).to.be.null;
    });
  });

  describe('selectRandomMovieId', () => {
    it('should return a valid movie ID', () => {
      const id = selectRandomMovieId();
      expect(id).to.be.a('number');
      const movie = getMovieDetailsById(id);
      expect(movie).to.not.be.null;
    });
  });
});

//this was a nightmare for some reason, had to swap from Jest to Chai due to having issues with CommonJs syntax, then downgrade my Chai, but in the end we got there. It has been a long day
//just attempting to make the easier part of this project function as intended. With love- Adam.
