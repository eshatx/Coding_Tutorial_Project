import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {ImCross} from 'react-icons/im'
import axios from "axios"
import { URL } from "../url"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"

const EditPost = () => {
    const postId = useParams().id;
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState("");
    const [cats, setCats] = useState([]);


    const fetchPost=async()=>{
        try{
          const res=await axios.get(URL+"/api/posts/"+postId)
          setTitle(res.data.title)
          setDesc(res.data.desc)
          setFile(res.data.photo)
          setCats(res.data.categories)
  
        }
        catch(err){
          console.log(err)
        }
      }
      const handleUpdate=async(e)=>{
        e.preventDefault()
        const post={
            title: title,
            desc: desc,
            username: user.username,
            userId: user._id,
            categories: cats
        }
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("img", filename);
            data.append("file", file);
            post.photo = filename;
            console.log(data)
            //img upload
            try{
                const imgUpload=await axios.post(URL+"/api/upload",data)
                
                //console.log(imgUpload.data)
            }
            catch(err){
                console.log(err)
            }
        }
        //post upload
        //console.log(post)
        try{
            const res=await axios.put(`${URL}/api/posts/`+postId, post, {
                withCredentials: true,
                headers: {
                    "Authorization": `${localStorage.getItem('token')}` // Include token in headers
                }
            });
            navigate("/posts/"+res.data._id)
            //console.log(res.data)
        }
        catch(err){
            console.log(err)
        }
        
      }


      useEffect(()=>{
        fetchPost()
      },[postId])

    const deleteCategory = (i) => {
        let updatedCats = [...cats];
        updatedCats.splice(i,1);
        setCats(updatedCats);

    }
    const addCategory = () => {
        let updatedCats = [...cats];
        updatedCats.push(cat);
        setCat("");
        setCats(updatedCats);
       
    }
    return(
        <div style={{ 
            background: "linear-gradient(135deg, #A1C4FD, #C2E9FB, #E2F4FD, #D4E6F1, #B4D9E8, #A2C9D6, #9ABAD8, #9B9BEB, #8A9BEB, #7A9AC9, #6C9BB2, #5A9A9E)", // soothing shades of blues and greens
            minHeight: "100vh" 
        }}>

            <Navbar />


            <div className="px-6 md:px-[200px]">
            <h1 className= 'font-bold md:text-2xl text-xl mt-8'>Update a post</h1>
            <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
                <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter post title' className='px-4 py-2 outline-none'/>
                <input onChange={(e)=>setFile(e.target.files[0])} type="file"  className='px-4'/>
                <div className="flex flex-col">
                    <div className='flex items-center space-x-4 md:space-x-8'>
                        <input value={cat} onChange={(e)=>setCat(e.target.value)}className='px-4 py-2 outline-none' placeholder='Enter post catagory'type='text'/>
                        <div onClick={addCategory}className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
                        

                    </div>

                    {/* categories */}
                    <div className='flex px-4 mt-3'>
                    {cats?.map((c,i)=>(
                        <div key={i} className='flex justify-centre items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                        <p>{c}</p>
                        <p onClick={() => deleteCategory(i)} className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"><ImCross/></p>


                        </div>

                    ))}


                    
                    </div>
                    

                </div>  
                <textarea onChange={(e)=>setDesc(e.target.value)} value={desc} rows={15} cols={30} className='px-4 py-2 outline-none' placeholder='Enter post description'/> 
                <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Update</button>
            </form>


            </div>
            <Footer />
        </div>
    );
}
export default EditPost;