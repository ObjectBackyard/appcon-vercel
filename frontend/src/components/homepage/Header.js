import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const [causes, setCauses] = useState();
  const navigate = useNavigate();

  const handleChange = (value) => {
    console.log("searching", value);
    axios
      .post("https://akap-api.vercel.app/api/fuzzy-search-causes", {
        search_query: value,
      })
      .then((response) => {
        console.log(response.data.success);
        if (response.data.success) {
          setCauses(response.data.data);
          console.log(response.data.data, "search");
        }
      });
  };




  return (
    <>
      <div className="flex justify-center items-center">
        <div className="z-50 fixed top-0 left-1/12 w-11/12 bg-gray-100 flex shadow-lg m-3 border rounded-md p-3 justify-between">
          <p
            className="flex text-xl text-center my-auto font-bold leading-none tracking-tight text-blue-900 md:text-5xl lg:text-5xl dark:text-white hover:bg=gray-900 hover:cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              className="w-12 my-auto aspect-square"
              src={require("../../images/akap-900.png")}
            ></img>
          </p>
          <div className="flex justify-between">
            <div className="text-center m-auto text-l font-medium text-gray-700">
              <button
                className="hover:underline "
                onClick={() => {
                  navigate("/discover");
                }}
              >
                CAUSES
              </button>
            </div>
          </div>

          <div className="avatar">
            <label className="input input-bordered flex items-center gap-2 my-auto">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-8 h-8 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>

            {causes && causes?.length > 0 && (
              <div className="origin-top-right absolute left-0 mt-20 w-[20vw] h-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-y-hidden ">
                <div
                  className="py-1  h-full overflow-y-auto"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {causes.map((cause, index) => {
                    return (
                      <a
                        key={index}
                        className="block px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                        onClick={() => {
                          navigate(`/cause/${cause._id}`);
                        }}
                      >
                        {cause.title}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="avatar">
            <div
              className="w-16 rounded-full"
              onClick={() => setProfile(!isOpen)}
            >
              <img src={require("../../images/defaultUser.jpg")} />
            </div>

            {profile && (
              <div className="origin-top-right absolute right-0 mt-20 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 h-20">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={() => {
                      navigate("/profile/myprofile");
                    }}
                  >
                    Profile
                  </a>
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Log out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </>
      
 
  );
};
