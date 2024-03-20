export function MoviesList({movies, setSelectedId}) {
  
  return <ul className="list list-movies">
        {movies.map((movie) => (
          // React.cloneElement(children, {key: movie.imdbID, movie: movie})
          <Movie key={movie.imdbID} setSelectedId={setSelectedId} movie={movie}/>
        )) }
      </ul>  
}

export function Movie({movie, setSelectedId}) {
  return <li key={movie.imdbID} onClick={() => setSelectedId(prevId => (prevId === movie.imdbID) ? null : movie.imdbID)}>
  <img src={movie.Poster} alt={`${movie.Title} poster`} />
  <h3>{movie.Title}</h3>
  <div>
    <p>
      <span>🗓</span>
      <span>{movie.Year}</span>
    </p>
  </div>
  </li>
}