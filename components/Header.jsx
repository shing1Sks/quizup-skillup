"use client";
import { TypewriterEffect } from "./ui/typewriter-effect.jsx";
import React from "react";
import Login_Signup from "./Login_Signup.jsx";
import Profile from "./Profile.jsx";

function Header({ theme, setTheme, user }) {
  const words = [
    {
      text: "Few",
    },
    {
      text: "minutes",
    },
    {
      text: "of",
    },
    {
      text: "fun",
    },
    {
      text: "and",
    },
    {
      text: "learning",
    },
    {
      text: "at",
    },
    {
      text: "the",
    },
    {
      text: "sametime",
    },
    {
      text: "!",
    },
  ];

  return (
    <div className="w-full h-[60px] justify-evenly items-center bg-yellow-300 dark:bg-blue-800 relative top-0 flex flex-row py-2">
      <div className="flex flex-row items-center justify-center">
        <div className="rounded-full w-[50px] sm:w-[60px]">
          <a href="/">
            <img src="./qs-logo-rmbg.png" alt="" />
          </a>
        </div>
        <p className="text-lg sm:text-2xl font-bold text-slate-700 dark:text-gray-300">
          <a href="/">Quizup-Skillup</a>
        </p>
      </div>
      <div className=" hidden sm:block">
        <TypewriterEffect words={words} />
      </div>
      <div className="flex flex-row items-center justify-center gap-x-2 sm:gap-x-4">
        <div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="bg-slate-700 rounded-md dark:bg-blue-400 p-1 text-2xl text-center"
          >
            {theme === "dark" ? "☀️" : "✨"}
          </button>
        </div>
        <div className="flex flex-row items-center justify-center">
          {user ? <Profile user={user} /> : <Login_Signup />}
        </div>
      </div>
    </div>
  );
}

export default Header;
