import React from 'react'
import { Link } from 'react-router-dom'

function Post({post}) {
    
  return (
    <article className='Post'>

        
        <Link to={`/post/${post.id}`}>
            <h2>
                {post.title}

            </h2>
            <p className='postDate'>
                {post.datetime}
            </p>
        </Link>
        <p className='postBody'>
            {(post.body.length) <= 50? post.body: `${post.body.slice(0,50)}...`}

        </p>


    </article>
  )
}

export default Post