import "../components/causes/Causes.css";
import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import Carousel from "./Carousel.js";

import { useParams } from "react-router-dom";

function ProfilePage() {
  // Get the userId param from the URL.
  let { userId } = useParams();
  // ...

  return <div style={{ fontSize: "50px" }}>Now showing post {userId}</div>;
}
export function AddLibrary(urlOfTheLibrary) {
  const script = document.createElement("script");
  script.src = urlOfTheLibrary;
  script.async = true;
  document.body.appendChild(script);
}

function startDonation() {
  // Your donation logic here
}

function BentoGrid() {
  const param = useParams();
  const id = param.id;
  const [displayItems, setDisplayItems] = useState([]); // State to track items to display
  const [item, setItem] = useState();
  const [urgency, setUrgency] = useState();
  const [causeType, setCauseType] = useState();
  useEffect(() => {
    // Fetch data or perform any other side effects here
    axios
      .get("https://akap-api.vercel.app/api/get-all-causes")
      .then((response) => {
        setDisplayItems(response.data.data);
        console.log(response.data.data[3]._id, "HSFDFDs");
        for (let i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i]._id == id) {
            setItem(response.data.data[i]._id);
            setUrgency(response.data.data[i].urgency);
            setCauseType(response.data.data[i].type);
          }
        }
      });
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen pt-[110px] content-center pb-[100px]">
      <div className="mt-[30px] bg-slate-100 max-h-[300px] mb:100 flex items-center justify-center flex-col">
        <div className="z-10">
          <h1 className="content-center z-10 ">CAUSE NI KUYA NIKKO</h1>
        </div>
      </div>

      <Carousel />
      <div className="mt-[100px] ml-[10dvw]">
        <div>
          <h1 className="mt-[0px]">Details</h1>
          <div className="w-[80vw] mt-[50px] mb-[40px]">
            <label>
              t is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </label>
          </div>
        </div>
        <div>
          <h1 className="mt-[0px]">Progress</h1>
          <div className="w-[30vw] mt-[50px] mb-[150px]">
            <progress
              class="progress progress-info w-[80vw] h-[20px]"
              value="50"
              max="100"
            ></progress>
          </div>
          <h2 className="mt-[-150px]">1000/2000 donated</h2>
        </div>
        <div className="flex flex-row mt-[100px] flex-wrap">
          <div className="flex flex-row w-[40vw]">
            <h1 className="ml-[0px]">Urgency:</h1>
            <div className="ml-[2vw] mt-[10px]">
              <h3>{urgency}</h3>
            </div>
          </div>
          <div className="flex flex-row w-[40vw]">
            <h1 className="ml-[0px]">Type of Cause:</h1>
            <div className="ml-[2vw] mt-[10px]">
              <h3>{causeType}</h3>
            </div>
          </div>
        </div>
        <section className="transaction-history ">
          <h1 className="mt-[100px]">Transaction History</h1>
          <ul>
            <li>
              <span>Adam S.</span>
              <span>mm/dd/yyyy</span>
              <span>500.00</span>
              <span>Gcash</span>
            </li>
            <li>
              <span>Adam S.</span>
              <span>mm/dd/www</span>
              <span>500.00</span>
              <span>Goosh</span>
            </li>
            {/* Add more transaction history items here */}
          </ul>
        </section>
      </div>

      <div className="donate-button">
        <button
          className="btn donate"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Donate
        </button>
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-2">
            This is to complete your transaction, please input the following
            information
          </p>
          <div className="modal-action flex flex-col">
            <label for="fname">Amount:</label>
            <input type="text" id="fname" name="fname" />
            <label for="lname">Message for cause:</label>
            <input type="text" id="lname" name="lname" />

            <button className="btn">Donate</button>
            <form method="dialog">
              <button className="btn w-[100%] mt-[10px]">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

function Causes() {
  const { id } = useParams();

  return (
    <div className="bg-slate-1000">
      <BentoGrid />
    </div>
  );
}

export default Causes;
