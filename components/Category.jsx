import React, { useEffect, useState, useContext } from "react";
import he from "he";
import Result from "./Result";
import { addScore } from "@/tools/addScore";
import { askAi } from "@/tools/askAi";
import { ColorRing } from "react-loader-spinner";
import { DifficultyContext } from "@/Context/DifficultyContext";

function Category({ quiz, next, setNext }) {
  const [selectedOption, setSelectedOption] = useState("");
  const { difficulty, setDifficulty } = useContext(DifficultyContext);
  const [check, setCheck] = useState(false);
  const handleRadioChange = (option) => {
    setSelectedOption(option);
  };

  if (!quiz) {
    quiz = {
      question: "None available under the chosen category ! 😔",
      incorrect_answers: [],
      correct_answer: "",
    };
  }
  const [aiRes, setAiRes] = useState();
  const aiHandle = async () => {
    if (quiz.question) {
      if (quiz.question != "None available under the chosen category ! 😔") {
        console.log(quiz.question);
        setLoader(true);
        setAiRes(await askAi(quiz.question));
        setLoader(false);
      }
    }
  };
  const qOpts = quiz?.incorrect_answers;
  const randQuiz = [];
  const [q, setQ] = useState([]);
  const [loader, setLoader] = useState(false);
  const [aiState, setAiState] = useState(false);
  useEffect(() => {
    if (qOpts.length == 3) {
      qOpts.push(quiz?.correct_answer);
      for (let i = 0; i < 4; i++) {
        const q = Math.floor(Math.random() * qOpts.length);
        randQuiz.push(qOpts[q]);
        qOpts.splice(q, 1);
        if (i == 3) {
          setQ(randQuiz);
        }
      }
    }
  }, [quiz]);
  const [result, setResult] = useState();
  const handleCheck = () => {
    if (selectedOption == "") {
      alert("select any one option please !");
      setCheck(false);
    } else {
      if (selectedOption == quiz?.correct_answer) {
        if (difficulty == "") {
          score(3);
          setResult(<Result score={3} result={true} />);
        }
        if (difficulty == "easy") {
          score(2);
          setResult(<Result score={2} result={true} />);
        }
        if (difficulty == "medium") {
          score(4);
          setResult(<Result score={4} result={true} />);
        }
        if (difficulty == "hard") {
          score(5);
          setResult(<Result score={5} result={true} />);
        }
      } else {
        if (difficulty == "") {
          score(-1);
          setResult(
            <Result score={-1} result={false} correct={quiz?.correct_answer} />
          );
        }
        if (difficulty == "easy") {
          score(-1);
          setResult(<Result score={-1} result={false} />);
        }
        if (difficulty == "medium") {
          score(-2);
          setResult(<Result score={-2} result={false} />);
        }
        if (difficulty == "hard") {
          score(-3);
          setResult(<Result score={-3} result={false} />);
        }
      }
    }
  };
  const score = async function (score) {
    await addScore(score);
  };

  return (
    <>
      <div className="w-full flex sm:flex-row gap-x-10 gap-y-3 sm:gap-y-0 flex-col items-center justify-center dark:bg-[#4f1127] bg-[#FB2E7B] h-fit pb-[100px] p-10">
        <div
          className="sm:w-[400px] border-2 rounded-lg sm:px-5 px-2 pt-16 pb-10 border-pink-900 bg-pink-300
      h-[400px] relative dark:text-pink-900 dark:bg-purple-300"
        >
          <h2 className="text-lg font-bold mb-8">
            {he.decode(quiz?.question)}
          </h2>
          <form>
            {q.map((option, index) => (
              <div key={index} className="mb-2">
                <label>
                  <input
                    type="radio"
                    name="quizOptions"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleRadioChange(option)}
                    className="mr-2"
                  />
                  {he.decode(option)}
                </label>
              </div>
            ))}
          </form>
          <div className="w-full flex items-center justify-center">
            {check ? (
              <button
                onClick={() =>
                  setTimeout(() => {
                    setNext(next + 1);
                    setResult("");
                    setCheck(false);
                    setSelectedOption("");
                    setAiState(false);
                  }, 600)
                }
                className=" absolute bottom-10 bg-orange-400 hover:bg-orange-600 px-4 border-2 border-white rounded-md text-white"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => {
                  setCheck(true);
                  handleCheck();
                }}
                className=" absolute bottom-10 bg-orange-400 hover:bg-orange-600 px-4 border-2 border-white rounded-md text-white"
              >
                Check
              </button>
            )}
          </div>
        </div>
        <div
          className="sm:w-[400px] border-2 rounded-lg sm:px-5 px-2 pt-16 pb-10 border-pink-900 dark:text-pink-900 dark:bg-purple-300 bg-pink-300 
      h-[400px] relative"
        >
          {!result ? (
            <p className="text-xl text-center font-semibold">
              Click check to veiw the correct answer !
            </p>
          ) : (
            result
          )}
        </div>
        {/* <div
          className="sm:w-[400px] border-2 rounded-lg border-pink-900 bg-pink-300
      h-[400px] flex flex-col items-center justify-center dark:text-pink-900 dark:bg-purple-300"
        >
          <h2 className="text-lg font-bold text-center">
            {he.decode(quiz?.question)}
          </h2>
          <button
            onClick={() => {
              if (!(selectedOption == "")) {
                aiHandle();
                setAiState(true);
              } else {
                alert("select any one option please !");
              }
            }}
            className={`mt-8 bg-orange-400 hover:bg-orange-600 px-4 border-2 border-white rounded-md text-white ${
              aiState ? "hidden" : "block"
            }`}
          >
            Ask from AI about the topic ?
          </button>
          <div className=" overflow-auto pt-5">
            Ai says:
            {aiState ? (
              loader ? (
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
              ) : (
                aiRes
              )
            ) : (
              ""
            )}
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Category;
