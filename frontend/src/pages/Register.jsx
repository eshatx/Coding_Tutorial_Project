import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import axios from 'axios'
import {URL} from '../url'


const Register = () => {

  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false)
  const navigate=useNavigate()



  const handleRegister=async ()=>{
    
    try{
      const res=await axios.post(URL+"/api/auth/register",{username,email,password})
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password)
      setError(false)
      navigate("/login")
      

    }
    catch(err){
      setError(true)
      console.log(err)
    }
  }

  return (
    <div style={{ 
      background: "linear-gradient(135deg, #A1C4FD, #C2E9FB, #E2F4FD, #D4E6F1, #B4D9E8, #A2C9D6, #9ABAD8, #9B9BEB, #8A9BEB, #7A9AC9, #6C9BB2, #5A9A9E)", // soothing shades of blues and greens
      minHeight: "100vh" 
  }}>
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
    <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Coding Tutorial</Link></h1>
    <h3><Link to="/login">Login</Link></h3>
    </div>
    <div className="w-full flex justify-center items-center h-[70vh]">
       <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
         <h1 className="text-xl font-bold text-left">Create an account</h1>
         <input onChange={(e)=>setUsername(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your username"/>
         <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email"/>
         <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password"/>
         <button onClick={handleRegister}className="w-full px-4 py-4 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-gray-500 hover:text-black">Register</button>
         {error && <h3 className="text-red-500 text-sm">Something went wrong!</h3>}
         <div className="flex justify-center items-center space-x-4">
          <p>Already have an account?</p>
          <p className="text-gray-500 hover:text-blue-500"><Link to="/login">Login</Link></p>
         </div>
       </div>
    </div>
    <Footer/>
    </>
    
   
  </div>  
  )
}

export default Register