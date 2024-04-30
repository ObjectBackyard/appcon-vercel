import { Routes, Route } from "react-router-dom";

import Home from "./pages/HomePage.js";
// import Login from
import ProfileRouter from "./ProfilePage/ProfileRouter.js";
import ProfilePage from "./ProfilePage/ProfilePage.js";
import ProfileCauses from "./ProfilePage/ProfileCauses.js";
import ProfileTransactions from "./ProfilePage/ProfileTransactions.js";
import ProfileSettings from "./ProfilePage/ProfileSettings.js";

import LogIn from "./pages/LogIn.js";
import SignUp from "./pages/SignUp.js";

import Causes from "./pages/Causes.js";
import ReceivedTransaction from "./ProfilePage/ReceivedTransaction.js";
import DonatedTransaction from "./ProfilePage/DonatedTransaction.js";
import Header from "./components/Header.js";

import Cause from "./pages/Cause.js";

import ViewCauses from "./pages/ViewCauses.js";
import Memorial from "./pages/Memorial.js";
import Displacement from "./pages/Displacement.js";
import Medical from "./pages/Medical.js";
import Animal from "./pages/Animal.js";
import Environment from "./pages/Environment.js";
import Education from "./pages/Education.js";
import Nonprofit from "./pages/Nonprofit.js";
import Community from "./pages/Community.js";
import Fire from "./pages/Fire.js";
import Flood from "./pages/Flood.js";
import Earthquake from "./pages/Earthquake.js";
import CreateCause from "./pages/CreateCause.js";


export const URL = "http://localhost:3001"

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path ="/" element = {<HeaderRouter/>}> */}
        <Route path="/" element={<Home />} />

        <Route path="/discover" element={<ViewCauses />} />
        {/* <Route path="/causes/:id" element={<Causes />} /> */}
        <Route path="/memorial" element={<Memorial />} />
        <Route path="/displacement" element={<Displacement />} />
        <Route path="/medical" element={<Medical />} />
        <Route path="/animal" element={<Animal />} />
        <Route path="/environment" element={<Environment />} />
        <Route path="/education" element={<Education />} />
        <Route path="/nonprofit" element={<Nonprofit />} />
        <Route path="/community" element={<Community />} />
        <Route path="/fire" element={<Fire />} />
        <Route path="/flood" element={<Flood />} />
        <Route path="/earthquake" element={<Earthquake />} />

        <Route path="/cause/:id" element={<Cause />} />
        <Route path="/create-cause" element={<CreateCause />} />
        {/* <Route path="/cause/:id" element={<Causes />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/profile" element={<ProfileRouter />}>
          <Route index path="myprofile" element={<ProfilePage />} />
          <Route path="user-causes" element={<ProfileCauses />} />
          <Route path="transactions" element={<ProfileTransactions />}>
            <Route index path="received" element={<ReceivedTransaction />} />
            <Route path="donated" element={<DonatedTransaction />} />
          </Route>
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
        {/* </Route> */}
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
