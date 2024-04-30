import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React, { Suspense } from "react";
const Spline = React.lazy(() => import("@splinetool/react-spline"));


const SignUp = () => {
  const [pending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  // const axios = require('axios');

  const goToLogIn = () => {
    navigate("/login");
  };


//   const signup = async () => {
    
//       axios.post("https://akap-api.vercel.app//api/create-account", {
//         first_name: formData.fname,
//         last_name: formData.lname,
//         password: formData.password,
//         bio: "",
//         email: formData.email,
//         contact_number: formData.contact_number,
//         profile_picture: "",
//         date_created: new Date(),
//         isAdmin: false,
//       })
//       .then((response)=> {
//         setIsPending(false)
//         console.log(response)
//       })
//       .catch((error)=>{
//         console.log(error)
//       })
   
// }
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsPending(true);
    console.log('newwwwwwww')

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    
    document.getElementById('confirm-password').setCustomValidity("Password does not match.")
    console.log(password, confirmPassword, "hiii")
    // if (password === confirmPassword) {
      const formData = {
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        phone: document.getElementById("phone-number").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        bio: "",
        stripe_id: "",
        user_image: "",
        date_created: new Date(),
        user_type: "User",
      };

      console.log(formData.phone)
      console.log(typeof formData.lname, typeof formData.fname, typeof formData.password, typeof formData.email)
      axios.post("https://akap-api.vercel.app/api/create-account", {
        first_name: formData.fname,
        last_name: formData.lname,
        password: formData.password,
        bio: "",
        email: formData.email,
        stripe_id: "",
        contact_number: formData.phone,
        user_image: "",
        date_created: "2024-04-27",
        user_type: "User",
      })
      .then((response)=> {
        setIsPending(false)
        console.log(response.data,"hiii")
       
        if(response.data.success){
          console.log("LOGINNNNNNNNNNNNNNNNNNNNNNn")
          navigate("/")
        }

      })
      .catch((error)=>{
        console.log(error)
      })

        return true
    // } else{
    //   setIsPending(false);
    //   return false
    // }
  };

  return (
    
      <div className=" bg-slate-100 flex flex-col w-[90%] mx-[5%] my-[3%] rounded-xl  shadow-[0_0px_8px_rgba(0,0,0,0.80)] lg:flex-row justify-center">
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
        <form
          className="grid flex-grow  h-[36vw]  w-[80%]  card  px-[2%] items-center"
          onSubmit={handleSubmit}
        >
          {/* <div className="flex flex-grow flex-col justify-center items-center w-[100%] border-4 border-red-400 "> */}
          <h1 className="text-[#213B9D] font-bold text-3xl text-center">
            SIGN UP
          </h1>
          <div className="flex flex-row justify-between">
            <div className="text-[#213B9D] -mb-[2%] basis-[48%]">
              <h2 className="text-[#213B9D]  text-xl -mb-[1%]">First Name</h2>
              <input
                required={true}
                type="text"
                placeholder="Type here"
                id="fname"
                className="input input-bordered bg-transparent border-black shadow-md shadow-gray-600"
              />
            </div>
            <div className="text-[#213B9D] basis-1/2">
              <h2 className="text-[#213B9D]  text-xl -mb-[1%]">Last Name</h2>
              <input
                required={true}
                id="lname"
                type="text"
                placeholder="Type here"
                className="input input-bordered  bg-transparent border-black shadow-md shadow-gray-600"
              />
            </div>
          </div>

          <div className="text-[#213B9D] ">
            <h2 className="text-[#213B9D]  text-xl ">Phone Number</h2>
            <input
              required={true}
              id="phone-number"
              type="text"
              placeholder="09XXXXXXXXX"
              pattern="(09[0-9]{9})"
              maxLength="11"
              className="w-full input input-bordered  bg-transparent border-black shadow-md shadow-gray-600"
            />
          </div>
          <div className="text-[#213B9D] w-full">
            <h2 className="text-[#213B9D]  text-xl ">Email</h2>
            <input
              required={true}
              id="email"
              type="email"
              placeholder="Type here"
              className="w-full input input-bordered  bg-transparent border-black shadow-md shadow-gray-600"
            />
          </div>
          <div className="text-[#213B9D] ">
            <h2 className="text-[#213B9D]  text-xl ">Password</h2>
            <input
              required={true}
              id="password"
              type="password"
              placeholder="Type here"
              minLength={8}
              className="w-full input input-bordered  bg-transparent border-black shadow-md shadow-gray-600"
            />
          </div>
          <div className="text-[#213B9D]">
            <h2 className="text-[#213B9D]  text-xl">Confirm Password</h2>
            <input
              required={true}
              id="confirm-password"
              type="password"
              placeholder="Type here"
              minLength={8}
              className="w-full input input-bordered  bg-transparent border-black shadow-md shadow-gray-600"
            />
          </div>
          <button
            type="submit"
            className="btn bg-[#213B9D] text-white text-xl  hover:bg-[#EF702E] hover:border-[#EF702E]"
            disabled={pending}
          >
            {pending ? "Signing up" : "Sign up"}
          </button>
          <p
            onClick={goToLogIn}
            className="text-black text-2xl  text-center hover:cursor-pointer"
          >
            Already have an account?{" "}
            <span className="text-[#213B9D] text-2xl">Log in here!</span>
          </p>

          {/* </div> */}
        </form>
      </div>
    
  );
};

export default SignUp;
