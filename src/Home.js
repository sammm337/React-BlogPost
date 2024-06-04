import React from 'react'
import Feed from './Feed'
function Home({posts}) {
  return (
   <main className='Home'>

    {posts.length? <Feed posts={posts}/> : <p>No posts yet.</p>}
   </main>
  )
}

export default Home