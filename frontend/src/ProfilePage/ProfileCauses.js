import React, { useState } from 'react'
import CauseCard from './CauseCard'
import axios from 'axios';
import { useEffect } from 'react';

const ProfileCauses = () => {

  const [causes, setCauses] = useState([]);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // user causes endpoint
    axios.get('https://akap-api.vercel.app/api/get-causes-by-user/6625a122fc13111100000001')
    .then(res => {
      // console.log(res.data, 'data')
      console.log(res.data.success, "stat")
      if(res.data.success){
        setCauses(res.data.data);
        console.log(res.data.data, "causes");
        setLoaded(true)
      }
     
    })

   
  }, []);

  return (
    <>
    <h1 className='text-3xl my-3 text-blue-600'> Causes </h1>
    {!loaded ? (
      <span className="loading loading-spinner loading-lg mx-auto"></span>
    ) : causes.length === 0 ? (
      <div className=' h-full w-fit flex flex-col items-center self-center justify-center'>
        <h1 className='mb-5'> No causes yet </h1>
        <a href='#' className='btn bg-green-600 text-white '> Create a cause</a>
      </div>
    ) : (
      <div className='profile-causes-container flex flex-wrap content-start gap-4 h-full w-fit overflow-auto no-scrollbar pb-20'>
        {causes.map(cause => (
          <CauseCard key={cause.id} details={cause} />
        ))}
      </div>
    )} 
  </>
  );

}

export default ProfileCauses
