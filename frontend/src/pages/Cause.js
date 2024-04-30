import { Footer } from "../components/Footer";
import { Header } from "../components/homepage/Header.js";
import React, { useState, useEffect } from "react";
import { Messages } from "../components/causes/messages";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import Carousel from "./Carousel.js";

import { useParams } from "react-router-dom";

const Cause = () => {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [totalAmount, setTotalAmount] = useState(5000);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://akap-api.vercel.app/api/get-cause/${id}`)
      .then((response) => {
        if(response.data.success){
          console.log(response.data.data, "niceee id cause hereeeeeeeee");
          setItem(response.data.data);
       
            setIsLoading(false);
      
        }
      
         
      });

      
     
   
  }, [id]);

  if(isLoading){
    return <span className="loading loading-spinner loading-lg text-4xl flex justify-center items-center h-[100vh] mx-auto"></span>;
  }  else {
    return (
      
      <>
  
        <Header />
        <div className="relative py-32 lg:py-36 bg-slate-100 image-full">
          <div className="flex justify-center">
            <div
              className="carousel carousel-center p-4 space-x-4 bg-white rounded-box"
              style={{ maxWidth: "70vw" }}
            >
              {item?.images.map((img, index) => {
                return (
                  <div
                    key={index}
                    className="carousel-item"
                    style={{ width: "80%" }}
                  >
                    <img src={img} className="rounded-box" />
                  </div>
                );
              })}
              {/* <div className="carousel-item">
                <img
                  src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
                  className="rounded-box"
                />
              </div> */}
            </div>
          </div>
          <div className="flex mt-20 flex-wrap justify-center">
            <div className="w-fit  px-56 ">
              <div className="pb-10">
                <h1
                  class="text-4xl leading-tight
              font-bold text-slate-800 max-w-96 text-left mx-auto mt-10 pb-5"
                >
                  {item?.title}
                </h1>
                <div className="inline-block bg-blue-700 rounded-3xl py-2 px-4 text-slate-100 text-xl">
                  {item?.type}
                </div>
              </div>
              <div>
                <p className="w-96">{item?.post_content}</p>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-3xl w-max mt-10 lg:mr-56 p-10">
                <h1 className="text-slate-700 font-bold">
                  Goal: {item?.goal_amount}
                </h1>
                <div className>
                  <progress
                    className="progress accent-blue-600"
                    value={(totalAmount / item?.goal_amount) * 100}
                    max="100"
                  ></progress>
                </div>
                <h2 className="font-bold mb-10">Current: {totalAmount}</h2>
                <button
                  className="flex text-white justify-center items-center w-max min-w-max sm:w-max px-6 h-12 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                                  after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#172554] hover:after:opacity-20 hover:after:scale-[2.5] bg-blue-600 border-transparent hover:border-[#172554] mr-6"
                  onClick={() =>
                    document.getElementById("my_modal_2").showModal()
                  }
                >
                  <span class="">Click here to donate</span>
                </button>
              </div>
            </div>
          </div>
          <h1
            class="text-3xl leading-tight
              font-bold text-slate-800 text-center mx-auto mt-20 w-2/3"
          >
            Messages from donors
          </h1>
          <Messages id={id} />
        </div>
  
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg pb-5">Donate</h3>
            <form method="dialog" className="modal-content">
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-bold mb-2">
                  Amount to be donated:
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-bold mb-2">
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                >
                  Donate
                </button>
                <button
                  type="button"
                  className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                  onClick={() => document.getElementById("my_modal_2").close()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
        <Footer />
      </>
    );
  }

 
};

export default Cause;
