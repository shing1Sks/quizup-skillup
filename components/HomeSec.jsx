"use client";
import { getUser } from "@/tools/getUser.js";
import React, { useState, useEffect } from "react";
import Stats from "./Home/Stats";
import Quizes from "./Quizes";
import Intro from "./Home/Intro";

function HomeSec() {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        handleUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);
  const [user, setUser] = useState(false);
  const handleUser = (u) => {
    setUser(u);
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Intro />
      <Stats user={user} />
      <Quizes />
    </div>
  );
}

export default HomeSec;
