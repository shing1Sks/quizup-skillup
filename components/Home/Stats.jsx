"use client";
import React, { useEffect, useState, useContext } from "react";
import { DifficultyContext } from "@/Context/DifficultyContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getRank } from "@/tools/getRank";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function Stats({ user }) {
  const { difficulty, setDifficulty } = useContext(DifficultyContext);
  const [tags, setTags] = useState({
    leaderboard: [],
    rank: "",
    rankS: "",
  });
  const handleChange = (event) => {
    setDifficulty(event.target.value);
  };
  const handleGetL = async () => {
    const res = await getRank();
    setTags(res);
  };
  useEffect(() => {
    handleGetL();
  }, []);
  return (
    <div className="w-full flex flex-row items-center justify-center p-8 bg-blue-200 dark:bg-green-600 text-blue-800 dark:text-white font-semibold h-fit">
      {user ? (
        <div className="flex sm:flex-row flex-col w-full items-center justify-around text-center text-lg gap-x-[40px] gap-y-3 sm:gap-y-1">
          <div className="text-sm">
            <p className="text-center text-lg">Difficulty</p>
            <div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  value=""
                  id="r1"
                  checked={difficulty === ""}
                  onChange={handleChange}
                />
                <label htmlFor="r1">Any</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="easy"
                  id="r2"
                  checked={difficulty === "easy"}
                  onChange={handleChange}
                />
                <label htmlFor="r2">Easy</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="medium"
                  id="r3"
                  checked={difficulty === "medium"}
                  onChange={handleChange}
                />
                <label htmlFor="r3">Medium</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="hard"
                  id="r4"
                  checked={difficulty === "hard"}
                  onChange={handleChange}
                />
                <label htmlFor="r4">Hard</label>
              </div>
            </div>
          </div>
          <p>SCORE:{user?.data?.user.score}</p>
          <p>RANK:{tags?.rankS}</p>
          {
            <ScrollArea className="h-[100px] w-[200px] sm:w-[280px] rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 leading-none text-center">
                Leaderboard !
              </h4>
              {tags?.leaderboard.map((tag, index) => (
                <div
                  key={tag.rank}
                  className={`text-sm
                overflow-x-auto h-[26px] ${
                  tag?.username == tags?.rank.username
                    ? "bg-gray-300 dark:bg-gray-700"
                    : ""
                }`}
                >
                  <span
                    className=" text-justify"
                    key={index}
                  >{`Rank ${tag?.rank} ${tag?.username} Score ${tag?.score}`}</span>
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          </ScrollArea>
          }
        </div>
      ) : (
        <div className="text-xl">
          <span>
            LOGIN/SIGNUP{" "}
            <p className="sm:inline-block hidden">
              TO UNLOCK COOL FEATURES ! SCORE,RANK,LEADERBOARD AND DIFFICULTY !
            </p>
          </span>
        </div>
      )}
    </div>
  );
}

export default Stats;
