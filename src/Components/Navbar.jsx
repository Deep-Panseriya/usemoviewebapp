import React, { useRef, useEffect } from 'react'

export default function Navbar ({ children }) {
  return (
    <nav className='nav-bar'>
      <Logo />
      {children}
    </nav>
  )
}

function Logo () {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

export function Search ({ query, setQuery }) {
  const inputEl = useRef(null)

  useEffect(
    function () {
      function callback (e) {
        if (document.activeElement === inputEl.current) return

        if (e.code === 'Enter') {
          inputEl.current.focus()
          setQuery('')
        }
      }

      document.addEventListener('keydown', callback)
      return () => document.removeEventListener('keydown', callback)
    },
    [setQuery]
  )
  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={e => setQuery(e.target.value)}
      ref={inputEl}
    />
  )
}

export function NumResult ({ movies }) {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  )
}
