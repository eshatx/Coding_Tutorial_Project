
const Footer = () => {
  return (
    <>
 <div className="mt-8 w-full bg-black px-8 md:px-[300px] flex md:flex-row flex-col space-y-4 md:space-y-0 items-start md:justify-between text-sm md:text-md py-8">

       <div className="flex flex-col text-white">
         <p>Featured Blogs</p>
         <p>Most Viewed</p>
         <p>Readers Choice</p>
       </div>

       <div className="flex flex-col text-white">
         <p>Forum</p>
         <p>Support</p>
         <p>Recent Posts</p>
       </div>
       
       <div className="flex flex-col text-white">
         <p>Privacy Policy</p>
         <p>About</p>
         <p>Terms & Conditions</p>
       </div>
      

    </div>
    <p className="py-2 pb-6 text-center text-white bg-black text-sm">ALL rights reserved  @Coding Tutorial 2024</p>   
    </>
    
    
  )
}

export default Footer