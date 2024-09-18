import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]); // This effect runs whenever `user` changes

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      const res = await axios.post(`${URL}/api/auth/login`, { email, password });

      // Assuming the token is returned in the response data
      const token = res.data.token;
      // Store token in local storage
      localStorage.setItem("token", token);
      // Save user info in context
      console.log(res.data);
      const userInfo = res.data; // Assuming user info is under `user`
      setUser({
        username: userInfo.username,
        email: userInfo.email,
        _id: userInfo._id,
        
      });

      // Navigate to the home page or another desired route
      navigate("/");
    } catch (err) {
      setError(true);
      console.error("Login failed:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #A1C4FD, #C2E9FB, #E2F4FD, #D4E6F1, #B4D9E8, #A2C9D6, #9ABAD8, #9B9BEB, #8A9BEB, #7A9AC9, #6C9BB2, #5A9A9E)", // soothing shades of blues and greens
      minHeight: "100vh"
    }}>
      <>
        <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
          <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Coding Tutorial</Link></h1>
          <h3><Link to="register">Register</Link></h3>
        </div>
        <div className="w-full flex justify-center items-center h-[70vh]">
          <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
            <h1 className="text-xl font-bold text-left">Log in to your account</h1>
            <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" />
            <input onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
            <button onClick={handleLogin} className="w-full px-4 py-4 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-gray-500 hover:text-black">Log in</button>
            {error && <h3 className="text-red-500 text-sm">Something went wrong!</h3>}
            <div className="flex justify-center items-center space-x-4">
              <p>New here?</p>
              <p className="text-gray-500 hover:text-blue-500"><Link to="/register">Register</Link></p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    </div>
  )
}

export default Login