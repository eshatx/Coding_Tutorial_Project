import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PostDetails from "./pages/PostDetails"
import CreatePost from "./pages/CreatePost"
import Profile from "./pages/Profile"
import EditPost from "./pages/EditPost"
import MyBlogs from "./pages/MyBlogs"
const App = () => {
  return (
    <div>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login/register" element={<Register />} />

        <Route exact path="/write" element={<CreatePost />} />
        <Route exact path="/posts/:id" element={<PostDetails />} />
        <Route exact path="/profile/:username" element={<Profile />} />
        <Route exact path="/edit/:id" element={<EditPost />} />
        <Route exact path="/myblogs/:id" element={<MyBlogs/>} />
        



      </Routes>

    </div>
  )
}

export default App