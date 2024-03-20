import { useEffect, useRef } from "react"
import { useKey } from "./myHooks"

export function Navbar({children}) {
    return <nav className="nav-bar">
        <Logo />
        {children}
      </nav>
}
function Logo() {
  return <div className="logo">
  <span role="img">🍿</span>
  <h1>usePopcorn</h1>
</div>
}
export function Search({query, setQuery}) {    
  const searchInput = useRef(null)
  
  useKey(13, () => {    
    if(document.activeElement === searchInput.current) return 
    searchInput.current.focus()
    setQuery('')
  })
  
  useEffect(() => {
    searchInput.current.focus()
  }, [])
  return <input
  className="search"
  type="text"
  placeholder="Search movies..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  ref={searchInput}
  />
}
export function Results({found}) {
  return <p className="num-results">
  Found <strong>{found}</strong> results
  </p>
}