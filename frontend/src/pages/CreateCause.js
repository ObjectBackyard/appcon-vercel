// CreateCause.js

import { useState } from "react";
import axios from "axios";
import "../components/causes/CreateCause.css";

const CreateCause = () => {
  const [causeData, setCauseData] = useState({
    title: "",
    post_content: "",
    goal_amount: "",
    urgency: "",
    type: "",
    images: null,
  });
  const [pending, setIsPending] = useState(false);
  const [value, setValue] = useState("High");
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCauseData({ ...causeData, [name]: value });
  };

  const handleFileChange = (e) => {
    // const file = e.target.files[0];
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      console.log(causeData, "causeee");
      const formData = new FormData();

      formData.append("user_id", "661b7158afa3b992b3e84799");
      formData.append("post_content", causeData.post_content);
      formData.append("goal_amount", causeData.goal_amount);
      formData.append("title", causeData.title);
      formData.append("date_created", new Date());
      formData.append("urgency", causeData.urgency);
      formData.append("type", causeData.type);

      if (Array.isArray(causeData.images)) {
        causeData.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      } else {
        formData.append("images", causeData.images);
      }
      // formData.append("images", causeData.images);
      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      // console.log(causeData.name, "namee")

      // const formData = {
      //   fname: document.getElementById("fname").value,
      //   lname: document.getElementById("lname").value,
      //   phone: document.getElementById("phone-number").value,
      //   email: document.getElementById("email").value,
      //   password: document.getElementById("password").value,
      //   bio: "",
      //   stripe_id: "",
      //   user_image: "",
      //   date_created: new Date(),
      //   user_type: "User",
      // };

      const response = await axios.post(
        "https://akap-api.vercel.app/api/create-cause",
        {
          user_id: "661b7158afa3b992b3e84799",
          post_content: causeData.post_content,
          goal_amount: causeData.goal_amount,
          title: causeData.title,
          date_created: new Date(),
          urgency: value,
          type: causeData.type,
          images: file,
        }
      );

      console.log(response.data);
      setIsPending(false);
    } catch (error) {
      console.error(error);
      setIsPending(false);
    }
  };

  return (
    <div className="flex h-lvh bg-blue-600">
      <div className="flex flex-col justify-center title-container w-1/3 bg-blue-600 p-20">
        <h1 className="text-slate-100 text-5xl pb-10 bold">
          We're here to help.
        </h1>
        <p className="text-slate-100 text-2xl pb-10">
          Create a cause and start making a change to the world.
        </p>
        <p className="text-slate-100 text-md underline">
          <a href="/">Click here to go back.</a>
        </p>
      </div>
      <div className="flex-grow p-16 w-2/3 bg-slate-100 rounded-tl-3xl rounded-bl-3xl shadow-2xl">
        <form onSubmit={handleSubmit} className="form">
          <div className="mb-2">
            <h1 className="text-xl text-blue-800">
              Give a title to your cause.
            </h1>
            <input
              type="text"
              id="title"
              name="title"
              value={causeData.title}
              onChange={handleChange}
              placeholder="Enter a name for your cause"
              className="input w-full max-w-screen rounded-3xl"
              required
            />
          </div>
          <div className="mb-2">
            <h1 className="text-xl text-blue-800">
              Enter the details of your cause
            </h1>
            <input
              type="text"
              id="post_content"
              name="post_content"
              value={causeData.post_content}
              onChange={handleChange}
              placeholder="Enter details for your cause"
              className="input w-full max-w-screen rounded-3xl"
              required
            />
          </div>
          <div className="mb-2">
            <h1 className="text-xl text-blue-800 mb-2">Set your goal (in $)</h1>
            <input
              type="number"
              id="goal_amount"
              name="goal_amount"
              value={causeData.goal_amount}
              onChange={handleChange}
              placeholder="Enter your desired goal amount"
              className="input w-full max-w-screen rounded-3xl"
              required
            />
          </div>
          <label className="form-control w-full max-w-xs mb-3">
            <div className="label">
              <h1 className="label-text text-xl text-blue-800">
                How urgent is your cause?
              </h1>
            </div>
            <select
              className="select select-bordered"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              required
            >
              <option disabled selected>
                Pick one
              </option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </label>

          <div className="mb-2">
            <h1 className="text-xl text-blue-800 mb-2">
              What best describes your cause?
            </h1>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() =>
                  setCauseData({ ...causeData, type: "Displacement" })
                }
                className={`cause-type-button focus:outline-none rounded-full px-4 py-2 ${
                  causeData.type === "Displacement"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-blue-700"
                }`}
              >
                Displacement
              </button>
              <button
                type="button"
                onClick={() => setCauseData({ ...causeData, type: "Medical" })}
                className={`cause-type-button focus:outline-none rounded-full px-4 py-2 ${
                  causeData.type === "Medical"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-blue-700"
                }`}
              >
                Medical
              </button>
              <button
                type="button"
                onClick={() => setCauseData({ ...causeData, type: "Animal" })}
                className={`cause-type-button focus:outline-none rounded-full px-4 py-2 ${
                  causeData.type === "Animal"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-blue-700"
                }`}
              >
                Animal
              </button>
              <button
                type="button"
                onClick={() =>
                  setCauseData({ ...causeData, type: "Environment" })
                }
                className={`cause-type-button focus:outline-none rounded-full px-4 py-2 ${
                  causeData.type === "Environment"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-blue-700"
                }`}
              >
                Environment
              </button>
              <button
                type="button"
                onClick={() => setCauseData({ ...causeData, type: "Memorial" })}
                className={`cause-type-button focus:outline-none rounded-full px-4 py-2 ${
                  causeData.type === "Memorial"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-blue-700"
                }`}
              >
                Memorial
              </button>
              <button
                type="button"
                onClick={() =>
                  setCauseData({ ...causeData, type: "education" })
                }
                className={`cause-type-button focus:outline-none rounded-full px-4 py-2 ${
                  causeData.type === "education"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-blue-700"
                }`}
              >
                Education
              </button>
              <button
                type="button"
                onClick={() =>
                  setCauseData({ ...causeData, type: "Nonprofit" })
                }
                className={`cause-type-button focus:outline-none rounded-full px-4 py-2 ${
                  causeData.type === "Nonprofit"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-blue-700"
                }`}
              >
                Nonprofit
              </button>
              <button
                type="button"
                onClick={() =>
                  setCauseData({ ...causeData, type: "Community" })
                }
                className={`cause-type-button focus:outline-none rounded-full px-4 py-2 ${
                  causeData.type === "Community"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-blue-700"
                }`}
              >
                Community
              </button>
              <button
                type="button"
                onClick={() => setCauseData({ ...causeData, type: "Fire" })}
                className={`cause-type-button focus:outline-none rounded-full px-4 py-2 ${
                  causeData.type === "Fire"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-blue-700"
                }`}
              >
                Fire
              </button>
              <button
                type="button"
                onClick={() => setCauseData({ ...causeData, type: "Typhoon" })}
                className={`cause-type-button focus:outline-none rounded-full px-4 py-2 ${
                  causeData.type === "Typhoon"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-blue-700"
                }`}
              >
                Typhoon
              </button>
              <button
                type="button"
                onClick={() => setCauseData({ ...causeData, type: "Flood" })}
                className={`cause-type-button focus:outline-none rounded-full px-4 py-2 ${
                  causeData.type === "Flood"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-blue-700"
                }`}
              >
                Flood
              </button>
              <button
                type="button"
                onClick={() =>
                  setCauseData({ ...causeData, type: "Earthquake" })
                }
                className={`cause-type-button focus:outline-none rounded-full px-4 py-2 ${
                  causeData.type === "Earthquake"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-blue-700"
                }`}
              >
                Earthquake
              </button>
            </div>
          </div>

          <div className="mb-16">
            <h1 className="text-xl text-blue-800 mb-2">
              Upload some images here.
            </h1>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleFileChange}
              accept="image/*"
              className="file-input file-input-bordered file-input-ghost w-full max-w-xs"
              style={{
                border: "1px solid #2563EB", // Blue-600 border color
                color: "#2563EB", // Blue-600 text color
              }}
              multiple
              required
            />
          </div>
          <button
            type="submit"
            className="form-button bg-blue-600"
            disabled={pending}
          >
            {pending ? "Creating..." : "Create Cause"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCause;
