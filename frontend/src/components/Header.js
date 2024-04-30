// import logo from './logo.svg';
import "../index.js";
import "./header.css";
import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const activeLink = "active";
const inactiveLink = "";
function Header() {
  const [causesDataList, setCausesDataList] = useState([
    "Loading, please wait....",
  ]);
  const navigate = useNavigate();
  async function getUser() {
    try {
      const response = (
        await Axios.get("https://akap-api.vercel.app/api/get-all-causes")
      ).data.data;

      let result = response.map((a) => a.qr_code);
      setCausesDataList(() => {
        var nval = result;
        // console.log("HELLO")
        return nval;
      });

      autocomplete(document.getElementById("searchBox"), { causesDataList });
    } catch (error) {
      console.error(error);
      setCausesDataList(() => {
        var nval = ["Loading"];
        return nval;
      });
    }
  }

  const handleClick = () => {
    navigate("/create-cause");
  };

  const AutoComplete = () => {
    document.addEventListener("DOMContentLoaded", function (event) {
      autocomplete(document.getElementById("searchBox"), { causesDataList });
    });
  };

  function autocomplete(inp, arr) {
    if (inp === null) {
      console.log("NULL TO");
      console.log(inp);

      return;
    }
    var arr = arr.causesDataList;

    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/

    var currentFocus;

    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("click", function (e) {
      console.log("IT WORKS in click");
      var a,
        b,
        i,
        val = this.value;
      /*close any already open lists of autocompleted values*/
      // console.log(val=== "")
      closeAllLists();
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete conta      if (!val) {
        return false;
      }iner:*/
      this.parentNode.appendChild(a);
      console.log("HELLO");
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (!val) {
          console.log("nagrrun ito");
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          // b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function (e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });
    inp.addEventListener("input", function (e) {
      var a,
        b,
        i,
        val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (
          arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase() &&
          causesDataList[0] != "Loading, please wait...."
        ) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function (e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        } else if (causesDataList[0] == "Loading, please wait....") {
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = arr[i].substr(0, val.length);
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function (e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      try {
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) {
          //up
          /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
      } catch (err) {
        console.log("ERROR");
      }
    });

    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }
  return (
    <nav className="header">
      <div className="pictureDiv">
        <button className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-blue-900 md:text-5xl lg:text-5xl dark:text-white">
          <NavLink
            className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
            to="/"
          >
            <p className="font-bold">AKAP</p>
          </NavLink>
        </button>
      </div>
      <div className="middleIsland" id="idMiddleIsland">
        {/* <div>
          <button
            className="headerButton dropdownButton"
            onClick={donateDropdown}
          >
            DONATE
          </button>
          <div id="donateElements" className="dropdown-content">
            <a href="#" onClick={handleClick} >Create a New Donation</a>
            <a href="#">Donate</a>
          </div>
        </div> */}

        <div>
          <button
            className="headerButton"
            onClick={() => {
              navigate("/discover");
            }}
          >
            {" "}
            DISCOVER CAUSES{" "}
          </button>
        </div>

        <div id="divSearchBox">
          <form id="searchForm">
            <input
              id="searchBox"
              autoComplete="off"
              type="text"
              placeholder="Search causes..."
              onClick={getUser}
            />
            <button type="button" id="headerSubmit" onClick={testResults}>
              <img
                id="sampleSearchButton"
                src={require("../images/search.png")}
                alt="Header logo"
              />
            </button>
          </form>
        </div>
      </div>
      <div id="profile-header">
        <button
          onClick={profileDropdown}
          className="pictureButton dropdownButton"
        >
          <img
            id="logo"
            src={require("../images/defaultUser.jpg")}
            alt="Header profile"
            className="rounded-full h-10 w-10 object-cover"
          />

          <div id="profileElements" className="profileDiv">
            {ProfileLink.map((menu) => (
              <a href={menu.url} key={menu.key}>
                {menu.name}
              </a>
            ))}
          </div>
        </button>
      </div>

      <div id="small-header">
        <button onClick={openDropdown} className="Header-Anchor">
          <img
            className="headerImage"
            src={require("../images/hamburger.png")}
          />
          <div id="dropDownFeatures" className="dropDownDiv">
            {SideLink.map((menu) => (
              <a href={menu.url} key={menu.key}>
                {menu.name}
              </a>
            ))}
          </div>
        </button>
      </div>

      <AutoComplete />
    </nav>
  );
}

const SideLink = [
  { name: "Create a Donation", url: "#", id: 8 },
  { name: "Donate", url: "#", id: 9 },
];

const ProfileLink = [
  {
    name: "Profile",
    url: "/profile/myprofile/?userid=6625a122fc13111100000001",
    id: 1,
  },
  { name: "Log-out", url: "#", id: 2 },
];

// const DonateLink = [
//   { name: "Log-in", url: "#", id: 1},
//   { name: "Log-out", url: "#", id: 2},
// ]

const openDropdown = (event) => {
  document.getElementById("dropDownFeatures").classList.toggle("show");
  console.log(document.getElementById("dropDownFeatures"));
};

const profileDropdown = (event) => {
  document.getElementById("profileElements").classList.toggle("show");
  console.log(document.getElementById("profileElements"));
};

function Indent() {
  return <div className="indent bg-slate-100"></div>;
}
function App() {
  return (
    <div>
      <Indent />
      <Header />
    </div>
  );
}

const testResults = async () => {
  const array = (
    await Axios.get("https://akap-api.vercel.app/api/get-all-causes")
  ).data;
  var search = document.getElementById("searchBox");
  var found = "false";
  var value;

  for (var i = 0; i < array.data.length; i++) {
    if (search.value == array.data[i].qr_code) {
      found = "true";
      value = array.data[i]._id;
      break;
    }
  }
  if (found === "true") {
    alert("FOUND IT");
    window.location.href = `http://localhost:3000/cause-view/${value}`;
  } else {
    alert("NONONO");
  }
  // var inputValue = search.value;
  // console.log(search.innerText)
};

window.onclick = function (event) {
  if (!event.target.matches(".dropdownButton")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

const donateDropdown = (event) => {
  //console.log(document.getElementById("donateElements"))
  document.getElementById("donateElements").classList.toggle("show");
};

export default App;
