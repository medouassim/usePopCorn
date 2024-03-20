import { useState } from "react";
import {Navbar, Results, Search} from "./Navbar"
import { MoviesList} from "./MoviesList";
import { WatchedMoviesList, Summary } from "./WatchedMoviesList";
import Box from "./Box";
import Loader from "./Loader";
import Details from "./Details";
import {useMovies, useLocaleStorageState} from "./myHooks";

const apiKey = '1e8714e0'
export default function App() {
  // const [ movies, setMovies ] = useState([]);
  const [ watched, setWatched ] = useLocaleStorageState([], 'watched')
  // const [ isLoading, setIsLoading ] = useState(false)
  // const [ error, setError ] = useState('')
  const [ query, setQuery ] = useState('')
  const [ selectedId, setSelectedId ] = useState(null)
  
  const {error, isLoading, movies} = useMovies(query, onCloseMovie)

  function onCloseMovie() {
      setSelectedId(null)
    }
  
  const handleAdd = (movie) => {
    
    setWatched(prevWatched => {
      return [...prevWatched, movie]
      
    })
    onCloseMovie()
  } 
  const handleDelete = (id) => {
    setWatched(prevWatched => prevWatched.filter(movie => movie.imdbId !== id))
    
  }

  // useEffect(() => {
  //   localStorage.setItem('watched', JSON.stringify(watched))
  // }, [watched])


  // useEffect(() => {
    // const controller = new AbortController()
    // async function fetchData() {
    //   try {
    //     setIsLoading(true)
    //     setError('')
    //     const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`, {signal: controller.signal})
    //     console.log(response)
    //     if(!response.ok) throw new Error("Error fetching data")
    //     const data = await response.json()
    //     if(data.Response === 'False') {
    //       setMovies([])
    //       throw new Error("Movie not found!")
    //     }
    //     setMovies(data.Search)
    //   } catch(e) {
        
    //     if(e.name !== 'AbortError') {
    //       setError(e.message)
    //       console.log(e)
    //     }
    //   } finally {
    //     setIsLoading(false)  
    //   }
    // }
  //   if(!query.length) {
  //     setError('')
  //     setMovies([])
  //     return
  //   } 
  //   fetchData()
  //   return function() {
  //     controller.abort()
  //   }
  // }, [query])

  return (
    <>
    <Navbar>
      <Search query={query} setQuery={setQuery}/>
      <Results found={movies.length ? movies.length : 0}/>
    </Navbar>
      <main className="main">
        <Box>
          {isLoading && <Loader /> }
          {!isLoading && !error && <MoviesList movies={movies} setSelectedId={setSelectedId}/> }
          {error && <ErrorMessage message={error}/>}
        </Box>
        <Box>
          {selectedId ? <Details selectedId={selectedId} apiKey={apiKey}
           onCloseMovie={onCloseMovie} handleAdd={handleAdd} watched={watched} /> : <>
          <Summary watched={watched} />
          <WatchedMoviesList watched={watched} handleDelete={handleDelete}/>
          </>}
        </Box>
      </main>
    </>
  );
}
function ErrorMessage({message}) {
  return <p className="error"><span>❌</span> {message}</p>
}