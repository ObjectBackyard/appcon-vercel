// import Header from "../components/Header.js";
import Nav from "../components/Nav.js";
import React, { useState, useEffect } from "react";
import { BentoGridDemo } from "../components/homepage/BentoGridDemo.js";
import { InfiniteMovingCardsDemo } from "./InfiniteMovingCardsDemo.js";
import { Footer } from "../components/Footer.js";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/homepage/Header.js";

const HomePage = () => {
  const user = Cookies.get("token");
  console.log(user, "cookie");
  const [userId, setUserId] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post("https://akap-api.vercel.app/api/verify-user")
      .then((response) => {
        if (response.data.status) {
          setUserId(response.data.id);
          console.log(response.data.id, "hiiii im in");
        }
        console.log(response.data.status, "statussss");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      {/* <Header /> */}
      <Header />
      <div class="relative py-32 lg:py-36 bg-slate-100">
        <div class="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div class="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">
            {/* <span class="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-green-400 blur-xl opacity-60 lg:opacity-95 lg:block hidden"></span> */}
            {/* <span class="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-blue-600 blur-xl opacity-80"></span> */}
          </div>
          {/* <span class="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-blue-600 to-green-400 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span> */}
          <div
            class="relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 
            lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2"
          >
            <h1
              class="text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl
            font-bold text-gray-900"
            >
              Changing the{" "}
              <span class="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 from-20% via-blue-600 via-30% to-green-600">
                World
              </span>{" "}
              one{" "}
              <span class="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 from-20% via-blue-600 via-30% to-green-600">
                Donation
              </span>{" "}
              at a time
            </h1>
            <br></br>
            <div className="flex">
              <button
                className="flex text-white justify-center items-center w-max min-w-max sm:w-max px-6 h-12 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                                after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#172554] hover:after:opacity-20 hover:after:scale-[2.5] bg-blue-600 border-transparent hover:border-[#172554] mr-6"
                onClick={() => {
                  navigate("/create-cause");
                }}
              >
                <span class="">Create a Cause</span>
              </button>
              <button
                className="flex text-white justify-center items-center w-max min-w-max sm:w-max px-6 h-12 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                                after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#172554] hover:after:opacity-20 hover:after:scale-[2.5] bg-blue-600 border-transparent hover:border-[#172554]"
                onClick={() => {
                  navigate("/discover");
                }}
              >
                <span class="">Donate to a Cause</span>
              </button>
            </div>
          </div>
          <div class="flex flex-1 lg:w-1/2 lg:h-auto relative lg:max-w-none lg:mx-0 mx-auto max-w-3xl">
            <img
              src={require("../images/hero01.png")}
              alt="Hero image"
              width="2350"
              height="2359"
              class="lg:absolute lg:w-full lg:h-full rounded-3xl object-cover lg:max-h-none max-h-96"
            ></img>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 pb-20">
        <h1 className="mb-9 text-5xl text-center text-blue-600 font-bold">
          Discover causes for you
        </h1>

        <div>
          <BentoGridDemo />
        </div>

        <InfiniteMovingCardsDemo />
      </div>

      <div className="bg-blue-600 flex justify-center items-center flex-col pt-20 pb-20">
        <div className="w-4/6 flex justify-center items-center pb-20">
          <div className="flex items-center gap-6 md:flex-row flex-col">
            {/* Layout */}
            <div className="text-right pr-12 w-2/3">
              {/* Text alignment */}
              <div className="text-4xl font-bold mb-2 text-slate-100">
                Our Mission
              </div>
              <p className="text-base text-slate-100">
                AKAP provides a secure and transparent platform for donors and
                changemakers to collaborate. We strive to simplify giving,
                maximize accountability, and ensure that every contribution
                fuels sustainable, meaningful impact.
              </p>
            </div>
            <div>
              <img
                src={require("../images/mission2.png")}
                alt="Mission description"
                className="rounded-lg drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)]"
              />
            </div>
          </div>
        </div>
        <div className="w-4/6 flex justify-center items-center">
          <div className="flex items-center gap-6 md:flex-row flex-col">
            <div>
              <img
                src={require("../images/vision2.png")}
                alt="Mission description"
                className="rounded-lg drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)]"
              />
            </div>
            <div className="text-left pl-12 w-2/3">
              <div className="text-4xl font-bold mb-2 text-slate-100">
                Our Vision
              </div>
              <p className="text-base text-slate-100">
                AKAP envisions a world transformed by kindness, where every
                donation makes a difference. We believe that connected
                communities and empowered individuals can drive lasting change.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
