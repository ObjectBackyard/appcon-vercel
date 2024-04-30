import {React, useEffect, useState} from "react";
import axios from "axios";

function ProfilePage() {
  var causesCreated = 0;

  const [user, setUser] = useState({});
  const [userStatistics, setUserStatistics] = useState([]);

  useEffect(() => {
    axios.post('https://akap-api.vercel.app/api/get-user', {
      id: "6625a122fc13111100000001"
    })
    .then((response)=>{
      console.log(response.data, "usr id")
      if(response.data.success){
        setUser(response.data.data)
      }
    })
    .catch((error) => {
      console.error(error);
    });


    // user stats endpoint
    axios.get('https://akap-api.vercel.app/api/get-user-statistics?user_id=6625a122fc13111100000001')
    .then(res => {
      setUserStatistics(res.data.data);
    })

  }, []);

  return (
    <>
      <h1 className="text-3xl my-3 self-start text-blue-600"> Profile </h1>
      <div className="flex items-center w-full justify-center mb-10">
        <div className="bg-white w-full rounded-box shadow">
          <div className="flex items-center justify-center w-full p-10 flex-col">
            {/* TODO: Crop image properly */}
            <div className=" h-32 w-32 rounded-full overflow-hidden border-solid border-black border-2">
              {user.user_image && 
                <img src={user.user_image} className=" w-32 h-32 object-cover" />
              }
              <img src={require('../images/defaultUser.jpg')} alt="default user" className="w-32 h-32 object-cover border-slate-200 border-2 border-solid" />
            </div>
            <h1 className="text-gray-800 font-semibold text-xl mt-5">{user.first_name} {user.last_name}</h1>
            <h1 className="text-gray-500 text-sm p-4 text-center">
              {user.bio}
            </h1>
            <div className="text-slate-200 mt-2 flex justify-center text-left gap-2 ">
              <div className="profile-label-left-container">
                <p className="text-gray-500 text-sm" > <strong> Email: </strong> </p>
                <p className="text-gray-500 text-sm" > <strong> Contact: </strong></p>
              </div>
              <div className="profile-label-right-container">
                <p className="text-gray-500 text-sm"> { user.email } </p>
                <p className="text-gray-500 text-sm"> { user.contact_number } </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {/*  STATS HERE */}
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full text-center">

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg className="h-10 fill-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.7 9.4c3 3.1 5.3 6.6 6.9 10.3s2.4 7.8 2.4 12.2V128c0 17.7-14.3 32-32 32s-32-14.3-32-32v-18.7L310.6 214.6c-11.8 11.8-30.8 12.6-43.5 1.7L176 138.1l-91.2 78.2c-13.4 11.5-33.6 9.9-45.1-3.5s-9.9-33.6 3.5-45.1l112-96c12-10.3 29.7-10.3 41.7 0l89.5 76.7L370.7 64H352c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c8.8 0 16.8 3.6 22.6 9.3zM0 304c0-26.5 21.5-48 48-48h416c26.5 0 48 21.5 48 48v160c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48zm48 112v48h48c0-26.5-21.5-48-48-48m48-112H48v48c26.5 0 48-21.5 48-48m368 112c-26.5 0-48 21.5-48 48h48zm-48-112c0 26.5 21.5 48 48 48v-48zm-96 80a64 64 0 1 0-128 0a64 64 0 1 0 128 0"/>
            </svg>
          </div>
          <div className="stat-title">Received </div>
          <div className="stat-value"> {userStatistics.received} </div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-secondary">
          <svg className="h-10 fill-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 12c2.76 0 5-2.24 5-5s-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5m5.45 5.6c-.39-.4-.88-.6-1.45-.6h-7l-2.08-.73l.33-.94L13 16h2.8c.35 0 .63-.14.86-.37s.34-.51.34-.82c0-.54-.26-.91-.78-1.12L8.95 11H7v9l7 2l8.03-3c.01-.53-.19-1-.58-1.4M5 11H.984v11H5z"/></svg>
          </div>
          <div className="stat-title">Donated</div>
          <div className="stat-value">{ userStatistics.sent }</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-secondary">
          <svg className="h-10 fill-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zM8.5 4h6l.5.667V5H1v-.333L1.5 4h6V1h1zM8 7.993c1.664-1.711 5.825 1.283 0 5.132c-5.825-3.85-1.664-6.843 0-5.132"/></svg>
          </div>
          <div className="stat-title">Created</div>
          <div className="stat-value">{ causesCreated }</div>
          
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
