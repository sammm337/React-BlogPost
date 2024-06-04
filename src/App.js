import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";
import Home from "./Home";
import About from "./About";
import PostPage from "./PostPage";
import Missing from "./Missing";
import NewPost from "./NewPost";
import { Route,useHistory,Routes, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { format } from 'date-fns';
import api from './api/posts'
import EditPost from "./EditPost";

function App() {
  const navigate = useNavigate();
  const[search,setSearch]=useState('')
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const[posts,setPosts]=useState([])
  const[prop,setProp]=useState('hello')
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const[searchResults,setSearchResults]=useState([])
  useEffect(()=>{
    const fetchPosts =async()=>
    {
      const response = await api.get("/posts");
      setPosts(response.data)
    }
    fetchPosts();
  },[])
  
  const handleDelete= async (id)=>

  {
    await api.delete(`/posts/${id}`);
    const newList =posts.filter((list)=> list.id !== id)
    setPosts(newList)
    navigate("/")
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    
    const response= await api.post("/posts", newPost)
    const allPosts = [...posts, response.data];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
 navigate("/");
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditBody('');
     navigate("/")
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }


  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  
  return (
    <div className="App">
      <Header title="Sam's Blog Page"/>
      <Nav search={search} setSearch={setSearch}/>
      <Routes>
      <Route exact path="/" element={ <Home posts={searchResults} /> } />

      <Route exact path="/post" element={ <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />} />

      <Route exact path="/post/:id" element={ <PostPage posts={posts} handleDelete={handleDelete}/>} />

      <Route exact path="/about" element={ <About/>} />

      <Route exact path="*" element={ <Missing/>} />
      <Route path="/edit/:id" element={<EditPost posts={posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}/>}/>
     

      </Routes>
      
      <Footer/>
   
    </div>
  );
}

export default App;
