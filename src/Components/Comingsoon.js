import React from 'react'
import{useNavigate} from "react-router-dom";

const Comingsoon = () => {

    let navigate = useNavigate();

    if(localStorage.getItem("token") === null)
    {
      navigate("/login")
    }
  return (
    <div className='text-white font-mono font-extrabold mt-[30%] ml-[10%] w-[100%]'>
      This feature is available soon meanwhile explore posting images,Likes, Retweet, 
      <br></br>
      <br></br>
      profile, follow ,Login & Signup, Stay Tune for new updates.....
    </div>
  )
}

export default Comingsoon
