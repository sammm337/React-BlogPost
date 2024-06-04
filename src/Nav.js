import React from 'react'
import { Link } from 'react-router-dom'
function Nav({search,setSearch}) {
  return (
    <nav className='Nav'>
      <form className='searchForm' onSubmit={(e)=>{e.preventDefault()}}>
          <label htmlFor='search'>search</label>
          <input id="search"
          type="text"
          placeholder="search posts"
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}></input>
      </form>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/post">NewPost</Link></li>
        <li><Link to="/about">About</Link></li>

      </ul>
    </nav>
  )
}

export default Nav