import { useEffect, useState } from "react"

export function useMovies(query, callback) {    
    const apiKey = '1e8714e0'
    const [ movies, setMovies ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState('')
    useEffect(() => {
        callback?.();
        const controller = new AbortController()
        async function fetchMovies() {
            try {
                if(!query.length) {
                    setError('')
                    setMovies([])
                    return
                }
               setIsLoading(true)
               setError('')
               const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`, {signal: controller.signal})
               if(!response.ok) throw new Error("Error Fetching Data")
               const data = await response.json()
               if(data.Response === 'False') {
                setMovies([])
                throw new Error("Movie not found!")
               } 
               setMovies(data.Search) 
            } catch(e) {
                if(e.name !== 'AbortError') {
                    console.log(e)
                    setError(e.message)
                }
                
            } finally {
                setIsLoading(false) 
            }
            
            
        }
        fetchMovies()     
        return () => {
            controller.abort()
        } 
    }, [query])
    return {movies, isLoading, error}
}
export function useLocaleStorageState(initialState, key) {
    const [ value, setValue ] = useState(() => {
        const stored = localStorage.getItem(key)
        return JSON.parse(stored) || initialState
      })

    useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])
    return [value, setValue]
}
export function useKey(keyCode, action) {

    useEffect(() => {
        function callback(e) {
            if(e.keyCode === keyCode) {
                action()
            }
        }
        document.addEventListener('keydown', callback)

        return () => {
            document.removeEventListener('keydown', callback)
        }  
    }, [keyCode, action])
    
}