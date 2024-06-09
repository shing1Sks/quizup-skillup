"use client";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getRank } from "@/tools/getRank";
import { ColorRing } from "react-loader-spinner";
import Logout from "./Logout";
function Profile({ user }) {
  const username = user.user.username;
  const avatar = user.user.avatar;
  const score = user.user.score;
  const [logout, setLogout] = useState(false);
  const [tags, setTags] = useState({
    leaderboard: [],
    rank: "",
    rankS: "",
  });
  const handleGetL = async () => {
    const res = await getRank();
    if (res) {
      setTags(res);
    }
  };
  useEffect(() => {
    handleGetL();
  }, []);
  return (
    <Sheet>
      <SheetTrigger>
        <div className="border-2 border-gray-600 dark:border-gray-200 text-gray-200 font-medium bg-blue-400 dark:bg-gray-800 rounded-md p-2">
          {avatar ? (
            <img className="rounded-full w-[20px]" src={avatar} alt="Profile" />
          ) : (
            <p>👤</p>
          )}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
          <SheetDescription>
            {logout ? (
              <div className="w-full flex items-center justify-center">
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              </div>
            ) : (
              <div>
                <div className="flex flex-col ml-4 items-center w-full justify-center text-center gap-y-5 text-xl">
                  <img
                    src={avatar}
                    alt="profile pic"
                    className="h-[160px] border-2 border-gray-600 rounded-lg"
                  />
                  <span>username: {username}</span>
                  <span>score: {score}</span>
                  <span>RANK:{tags?.rankS}</span>
                </div>
                {Array.isArray(tags.leaderboard) && (
                  <ScrollArea className="h-[100px] w-[220px] sm:w-[280px] ml-6 rounded-md border mt-4 ">
                    <div className="pt-4">
                      <h4 className="mb-4 leading-none text-center">
                        Leaderboard !
                      </h4>
                      {tags?.leaderboard.map((tag, index) => (
                        <div
                          key={tag.rank}
                          className={`text-sm
                        overflow-x-auto text-center h-[26px] ${
                          tag?.username == tags?.rank.username
                            ? "bg-gray-300 dark:bg-gray-700"
                            : ""
                        }`}
                        >
                          <span
                            className="text-center"
                            key={index}
                          >{`Rank ${tag?.rank} ${tag?.username} Score ${tag?.score}`}</span>
                          <Separator className="my-2" />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
                <div className="w-full flex items-center justify-center pt-10">
                  <Logout setLogout={setLogout} />
                </div>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default Profile;
