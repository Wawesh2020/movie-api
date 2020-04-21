const movies = require('../movies')

const getAllMovies = (request, response) => {
  return response.send(movies)
}

const getMovieByDirectors = (request, response) => {
  const { search } = request.params

  const matchingMovieDirectors = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(search.toLowerCase()) ||
     movie.directors.find((director) => director.toLowerCase().includes(search.toLowerCase()))
  })

  return matchingMovieDirectors
    ? response.send(matchingMovieDirectors)
    : response.status(404).send('Movie not found')
}



const saveNewMovie = (request, response) => {
  const {
    title, directors, releaseDate, rating, runTime, genres,
  } = request.body

  if (!title || !directors || !releaseDate || !rating || !runTime || !genres) {
    return response
      .status(400)
      .send('The following fields are required:  title, directors, releaseDate, rating, runTime, genres')
  }

  const newMovie = {
    title, directors, releaseDate, rating, runTime, genres,
  }

  movies.push(newMovie)

  return response.status(201).send(newMovie)
}



module.exports = { getAllMovies, getMovieByDirectors, saveNewMovie }
