import React, { useState } from "react";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { X } from "lucide-react";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const [loader, setLoader] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    if (signUp) {
      try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("fullname", fullname);
        formData.append("password", password);
        formData.append("project", "skillup-quizup");
        formData.append("avatar", avatar);
        console.log(username,avatar,fullname,password)
        if (username == "" || fullname == "" || password == "") {
          alert("username fullname password required !!");
          setLoader(false);
          return;
        }
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER}/api/user/register`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        // const currentDate = new Date();
        // const nextDay = new Date(currentDate);
        // nextDay.setDate(currentDate.getDate() + 1);
        // document.cookie = `accessToken=${
        //   response.data.data.accessToken
        // };expires=${nextDay.toUTCString()};`;
        // document.cookie = `refreshToken=${
        //   response.data.data.refreshToken
        // };expires=${nextDay.toUTCString()};`;
        setLoader(false);
        location.reload();
      } catch (error) {
        alert("There is already an account under that username !");
        setLoader(false);
        console.error("There was an error registering the user!", error);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER}/api/user/login`,
          { username, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        // const currentDate = new Date();
        // const nextDay = new Date(currentDate);
        // nextDay.setDate(currentDate.getDate() + 1);
        // document.cookie = `accessToken=${
        //   response.data.data.accessToken
        // };expires=${nextDay.toUTCString()};`;
        // document.cookie = `refreshToken=${
        //   response.data.data.refreshToken
        // };expires=${nextDay.toUTCString()};`;
        setLoader(false);
        location.reload();
      } catch (error) {
        setLoader(false);
        alert("create an account first!");
      }
    }
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  return (
    <div>
      <div
        className={`w-full flex flex-col items-center justify-center py-5 gap-5 ${
          login || signUp ? "hidden" : "block"
        }`}
      >
        <button
          onClick={() => setLogin(true)}
          className={` text-lg border-2 hover:bg-gray-300 hover:text-gray-400 border-gray-600 px-5 rounded-md"
          `}
        >
          Login
        </button>
        <span className={`text-center`}>OR</span>
        <button
          onClick={() => setSignUp(true)}
          className={`text-lg border-2 hover:bg-gray-300 hover:text-gray-400 border-gray-600 px-5 rounded-md"
          `}
        >
          SingUp
        </button>
      </div>
      {login || signUp ? (
        login ? (
          loader ? (
            <div className="w-full flex items-center justify-center">
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </div>
          ) : loader ? (
            <div className="w-full flex items-center justify-center">
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-2 border-gray-400 rounded-md"
                required
              />
              <br />
              <br />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-gray-400 rounded-md"
                required
              />
              <br />
              <br />

              <button
                type="submit"
                className="border-2 py-1 rounded-md border-gray-700"
              >
                Register
              </button>
            </form>
          )
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 border-gray-400 rounded-md"
              required
            />
            <br />
            <br />

            <label htmlFor="fullname">Fullname:</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="border-2 border-gray-400 rounded-md"
              required
            />
            <br />
            <br />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-gray-400 rounded-md"
              required
            />
            <br />
            <br />

            <label htmlFor="avatar">Avatar:</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <br />
            <br />

            <button
              type="submit"
              className="border-2 py-1 rounded-md border-gray-700"
            >
              Register
            </button>
          </form>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default RegisterForm;
