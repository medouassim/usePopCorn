import { useEffect, useRef, useState } from "react"
import StarRating from './StarRating'
import Loader from "./Loader"
import { useKey } from "./myHooks"
export default function Details({selectedId, apiKey, onCloseMovie, handleAdd, watched}) {
    const [ selectedMovie, setSelectedMovie ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)
    const [ userRating, setUserRating ] = useState(0)
    const isWatched = watched.map(movie => movie.imdbId).includes(selectedId)
    const watchedRating = watched.find(movie => movie.imdbId === selectedId)?.userRating
    const clickCount = useRef(0)
    useEffect(function() {
        if (userRating) clickCount.current++
    }, [userRating])
    
    useEffect(function() {
        async function fetchMovie() {
        setIsLoading(true)
        const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`)
        if(!res.ok) {
            throw new Error("API request failed")
        }
        const data = await res.json()
        setSelectedMovie(data)
        setIsLoading(false)
    }
        fetchMovie()
    }, [selectedId, apiKey])
    const {
    Title: title,
    Poster: poster,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Director: director, 
    } = selectedMovie

    useEffect(function () {
        if(!title) return
        document.title = `usePopCorn | ${title}` 
        return () => {
            document.title = 'usePopCorn'
        } 
    }, [title])
    
    useKey(8, onCloseMovie)
    // useEffect(() => {
        
        
    //     document.addEventListener('keydown', handleBackSpaceClose)
    
    //     return function () {
    //         document.removeEventListener('keydown', handleBackSpaceClose)
    //     }
    //   }, [onCloseMovie])
   const creatAndHandleAdd = () => {
    const newWatchedMovie = {
        title, 
        imdbRating,
        userRating: userRating,
        runtime: Number(runtime.split(' ')[0]),
        poster,
        imdbId : selectedId,
        clickCount: clickCount.current
    }
    console.log(newWatchedMovie)
    handleAdd(newWatchedMovie)
   }
    return isLoading ? <Loader /> : <div className="details">
        <header>        
            <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
            <img src={poster} alt="" />
            <div className="details-overview">
               <h2>{title}</h2> 
               <p>{released} &bull; {runtime}</p>
               <p>{genre}</p>
               <p><span>⭐️</span>{imdbRating}</p>
            </div>
            
        </header>
        
        <section>{!isWatched ? <div className="rating">
                <StarRating range={10} size={22} key={selectedId} onSet={setUserRating}/>
                {userRating > 0 && <button className="btn-add" onClick={creatAndHandleAdd}>
                    + Add To List</button>}
                </div> : <p>you rated this movie with {watchedRating}</p>}
            
            <p><em>{plot}</em></p>
            <p>Starring {actors}</p>
            <p>Directed by: {director}</p>
        </section> 
    </div>
    
    
}