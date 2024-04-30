import { Header } from "../components/homepage/Header.js";
import React, { useState, useEffect } from "react";
import { TypeGrid } from "../components/TypeGrid";
import { Footer } from "../components/Footer";
import { BentoGridDemo } from "../components/homepage/BentoGridDemo";
import { useNavigate } from "react-router-dom";

const Displacement = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="relative py-32 lg:py-36 bg-slate-100 image-full">
        <div className="rounded-lg w-1/3 shadow-xl image-full mx-auto">
          <figure>
            <img
              className="rounded-lg w-full h-full object-cover"
              src="https://plus.unsplash.com/premium_photo-1683140531413-3b29776dfefa?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Shoes"
            />
          </figure>
        </div>
        <h1
          class="text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl
            font-bold text-slate-800 text-center mx-auto mt-10 w-2/3"
        >
          Look through displacement causes at AKAP
        </h1>
        <button
          className="flex text-white justify-center items-center w-max min-w-max sm:w-max px-6 h-12 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                                after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#172554] hover:after:opacity-20 hover:after:scale-[2.5] bg-blue-600 border-transparent hover:border-[#172554] mx-auto mt-10 mb-20 sm:mb-20 md:mb-20 lg:mb-24"
          onClick={() => {
            navigate("/create-cause");
          }}
        >
          Create a Cause
        </button>

        <hr class="h-px my-8 mb-20 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <TypeGrid itemType={"Displacement"} />
      </div>
      <Footer />
    </>
  );
};

export default Displacement;
