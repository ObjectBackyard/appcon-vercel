import { Header } from "../components/homepage/Header.js";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiHome, CiMedicalCase, CiHeart } from "react-icons/ci";
import {
  PiBookLight,
  PiDogLight,
  PiFireLight,
  PiHandLight,
  PiTreeLight,
} from "react-icons/pi";
import { GoPeople } from "react-icons/go";
import { BsWater } from "react-icons/bs";
import { WiEarthquake } from "react-icons/wi";

const buttons = [
  { icon: CiHeart, label: "Memorial", path: "/memorial" },
  { icon: CiHome, label: "Displacement", path: "/displacement" },
  { icon: CiMedicalCase, label: "Medical", path: "/medical" },
  { icon: PiDogLight, label: "Animal", path: "/animal" },
  { icon: PiTreeLight, label: "Environment", path: "/environment" },
  { icon: PiBookLight, label: "Education", path: "/education" },
  { icon: PiHandLight, label: "Nonprofit", path: "/nonprofit" },
  { icon: GoPeople, label: "Community", path: "/community" },
  { icon: PiFireLight, label: "Fire", path: "/fire" },
  { icon: BsWater, label: "Flood", path: "/flood" },
  { icon: WiEarthquake, label: "Earthquake", path: "/earthquake" },
];

const ViewCauses = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="relative py-32 lg:py-36 bg-slate-100">
        <h1
          class="text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl
            font-bold text-slate-800 text-center mx-auto"
        >
          Browse causes by type
        </h1>
        <p className="text-xl text-slate-800 mx-auto mt-3 text-center">
          Discover causes based on what you care about.
        </p>
        <button
          className="flex text-white justify-center items-center w-max min-w-max sm:w-max px-6 h-12 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                                after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#172554] hover:after:opacity-20 hover:after:scale-[2.5] bg-blue-600 border-transparent hover:border-[#172554] mx-auto mt-10 mb-20 sm:mb-20 md:mb-20 lg:mb-24"
          onClick={() => {
            navigate("/create-cause");
          }}
        >
          Create a Cause
        </button>

        <div className="flex justify-center items-center w-full">
          <div className="flex flex-wrap gap-8 justify-center">
            {buttons.map((button, index) => (
              <Link key={index} to={button.path} className="group relative">
                <button className="w-40 h-40 rounded-lg bg-white shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1">
                  <span className="flex justify-center items-center h-full">
                    <button.icon className="text-6xl text-gray-800 group-hover:text-blue-600 transition duration-200 ease-in-out" />
                  </span>
                </button>
                <p className="text-center text-sm font-medium mt-2 group-hover:text-gray-800 transition duration-200 ease-in-out">
                  {button.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCauses;
