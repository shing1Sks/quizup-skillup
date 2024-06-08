import React from "react";

function Result({ result,score ,correct = "" }) {
  return (
    <div>
      <div className="font-bold rounded-2xl text-purple-900 text-2xl text-center">
        <p className="text-sm text-red-600 pb-10">
          Your scores will be kept on record if logged in to make sure u can
          save and showcase your progress !!
        </p>
        {result ? (
          <p>
            <span className="text-green-500">Hoorayyy !!</span> {score} points !
            Correct Choice 🎉 🎆 🥳 💃
          </p>
        ) : (
          <p>
            <span className="text-red-500">Ooopsie Daisyy!!</span> {score} point !
            Incorrect Choice ! correct answer is {correct} 😥{" "}
          </p>
        )}
      </div>
    </div>
  );
}

export default Result;
