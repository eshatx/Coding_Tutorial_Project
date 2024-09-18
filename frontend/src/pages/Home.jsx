import Footer from "../components/Footer"
import HomePosts from "../components/HomePosts"
import Navbar from "../components/Navbar"
import { useEffect } from "react"
import axios from "axios"
import {URL} from "../url"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import Loader from "../components/Loader"
import { UserContext } from "../context/UserContext"
import { useContext } from 'react';
import { Link } from "react-router-dom"


const Home = () => {

  const {search}=useLocation()
  //console.log(search)
  const [posts, setPosts] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [loader,setLoader]=useState(false)
  const {user}=useContext(UserContext)
  //console.log(user)

  const fetchPosts = async () => {
    setLoader(true)
    try {
      const res = await axios.get(URL+"/api/posts/"+search)
      //console.log(res.data)
      setPosts(res.data)
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
    } 
    catch (err) {
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [search])

  return (
    <div style={{
      background: "linear-gradient(135deg, #A1C4FD, #C2E9FB, #E2F4FD, #D4E6F1, #B4D9E8, #A2C9D6, #9ABAD8, #9B9BEB, #8A9BEB, #7A9AC9, #6C9BB2, #5A9A9E)", // soothing shades of blues and greens
      minHeight: "100vh"
    }}>
      <>
        <Navbar />
        <div className="px-8 md:px-[200px] min-h-[80vh]">
          {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults?posts.map((post) => (
            <>
            <Link to={user?`/posts/${post._id}`:"/login"}>
            <HomePosts key={post._id} post={post} />

            </Link>

            </>
          )):<h3 className="font-bold text-center mt-16">No posts available</h3>}

        </div>
        <Footer />

      </>


    </div>

  )
}

export default Home