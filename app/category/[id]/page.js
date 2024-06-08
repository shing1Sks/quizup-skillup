"use client";
import { DifficultyContext } from "@/Context/DifficultyContext";
import Category from "@/components/Category";
import { getQuizes } from "@/tools/getQuizes";
import React, { useState, useEffect, useContext } from "react";
import { ColorRing } from "react-loader-spinner";

const page = React.memo(({ params }) => {
  const { difficulty, setDifficulty } = useContext(DifficultyContext);
  const id = params?.id;
  const [quiz, setQuiz] = useState("");
  const [quizE, setQuizE] = useState(false);
  const [next, setNext] = useState(0);
  var now;
  var lastCallTime = 0;
  const handleGetQuiz = async () => {
    const timeSinceLastCall = now - lastCallTime;
    const waitTime = 5000 - timeSinceLastCall;
    if (waitTime > 0) {
      return;
    }
    lastCallTime = Date.now();
    setQuiz(await getQuizes(id, difficulty));
  };
  useEffect(() => {
    now = Date.now();
    handleGetQuiz();
  }, [id]);
  useEffect(() => {
    if (quiz) {
      setQuizE(
        <Category quiz={quiz.results[next]} next={next} setNext={setNext} />
      );
    }
  }, [quiz]);
  useEffect(() => {
    if (next == 0) {
      return;
    }
    if (next == 28) {
      handleGetQuiz();
      setNext(0);
    }
    setQuizE(
      <Category quiz={quiz.results[next]} next={next} setNext={setNext} />
    );
  }, [next]);
  return (
    <div className="flex items-center justify-center w-full bg-[#FB2E7B]">
      {quizE ? (
        quizE
      ) : (
        <div className="relative pt-[100px] pb-[400px]">
          {" "}
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
      )}
    </div>
  );
});
page.displayName = "CategoryPage";
export default page;
