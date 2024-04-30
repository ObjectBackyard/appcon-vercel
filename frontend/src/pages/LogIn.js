
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React, { Suspense } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import Cookies from "js-cookie"

const Spline = React.lazy(() => import('@splinetool/react-spline'));

const LogIn = () => {
  const navigate = useNavigate()
  const [pending,setIsPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const goToSignUp = () =>{
    navigate('/signup')
  }


  const handleSubmit = (event) =>{
    event.preventDefault();
    setIsPending(true);

    const formData = {
      email: document.getElementById('login-email').value,
      password: document.getElementById("login-password").value
    }

    axios.post(
        "https://akap-api.vercel.app/api/log-in",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
         
        }
      )
      .then((response) => {
        console.log(response.headers, console.log(response.data.success));
        if (response.data.success) {
          console.log("Logged In", response.data);
          setIsPending(false);  

          Cookies.set('token', response.data.data, { expires: 7 })
          navigate('/')




          // axios.post("https://akap-api.vercel.app/api/verify-user")
          // .then((response )=>{
          //   console.log(response.headers, "verify token")
          //   if(response.data.status){
          //     // setUserId(response.data.id)
          //     // console.log(response.data.id, "hiiii im in")
          //     navigate("/");
          //   }
          //   console.log(response.data.status, "statussss")
          // })
          // .catch((error) => {
          //   console.log(error);
          // });
      
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }



  return (
    
    <div className=''>
      <div className="bg-slate-100 flex flex-col justify-center w-[90%] mx-[5%] my-[3%] rounded-xl  shadow-[0_0px_8px_rgba(0,0,0,0.80)] lg:flex-row ">
        <form
          onSubmit={handleSubmit}
          className="grid flex-grow   h-[36vw] w-[80%]  card   px-[2%] items-center  "
        >
          {/* <div className="flex flex-grow flex-col justify-center items-center w-[100%] border-4 border-red-400 "> */}
          <h1 className="text-[#213B9D] font-bold text-3xl text-center">
            LOG IN
          </h1>
          <div className="text-[#213B9D]  w-full">
            <h2 className="text-[#213B9D] text-xl ">Email</h2>
            <input
              id="login-email"
              type="email"
              placeholder="Type here"
              className="w-full input input-bordered bg-transparent border-black shadow-md shadow-gray-600"
              required={true}
            />
          </div>
          <div className="-mt-12  w-full] flex flex-col">
            <h2 className="text-[#213B9D] text-xl">Password</h2>
            <div className='flex w-full flex-nowrap'>
              <div className="w-full input input-bordered bg-transparent border-black shadow-md shadow-gray-600  gap-2">
                <input
                  id="login-password"
                  minLength={8}
                  type={showPassword ? "text" : "password"}
                  placeholder="Type here"
                  className={ `absolute   placeholder:absolute  ${showPassword ? 'left-[0.5vw] top-[19vw] placeholder:left-[2vw] placeholder:top-[0.6vw] ' : 'left-[2vw]  top-[19.5vw] placeholder:left-[0.5vw] placeholder:top-[0.5vw] '}  `}
                  required={true}
                />
                <label className="swap absolute left-[41vw] pt-3">
                  <input
                    type="checkbox"
                    value={showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                    // className='border-4 border-red-400 '
                  />
                  <Visibility className="swap-on fill-current " />
                  <VisibilityOff className="swap-off fill-current " />
                </label>
              </div>
            </div>
          </div>
        
          <button
            type="submit"
            className="btn l bg-[#213B9D] text-white text-xl  hover:bg-[#EF702E] hover:border-[#EF702E] -mt-24"
          >
            {pending ? "Logging in" : "Log in"}
          </button>
          <p
            onClick={goToSignUp}
            className="text-black text-2xl  text-center -mt-32 hover:cursor-pointer"
          >
            New to Akap?{" "}
            <span className="text-[#213B9D] text-2xl">Join Now</span>
          </p>

          {/* </div> */}
        </form>
        <Suspense className="rounded-xl" fallback={<div>Loading...</div>}>
          <div className="relative text-center grid flex-grow w-[80%]  card  rounded-xl place-items-center bg-blend-lighten bg-slate-100">
            {/* <Spline
              color="bg-slate-100"
              className="bg-blend-multiply bg-contain"
           
              scene="https://prod.spline.design/aMSMBCnv3nw4LPSY/scene.splinecode"
            /> */}
            <div className="absolute text-center font-bold text-7xl leading-[6vw] text-[#213B9D]">
              <h2>Changing the world -</h2>
              <h2>one donation at a time.</h2>
            </div>
          </div>
        </Suspense>
      </div>
    </div>

  );
};

export default LogIn;
