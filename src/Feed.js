import { faLevelDown } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Post from './Post'
import { useState } from 'react'
function Feed({posts}) {
    // console.log(posts)
    // const[prop,setProp]=useState('Test')
  return (
    <div>
       
        {posts.map( post =>(
            <Post key={post.id} post={post}/>
         
        ))} 
        {/* <Post prop={prop}/> */}
    </div>
  )
}

export default Feed