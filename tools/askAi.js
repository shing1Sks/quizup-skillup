import { GoogleGenerativeAI } from "@google/generative-ai";

export const askAi = async (q) => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `${q} is an question from a quiz . i want you to give me info about and around the topic the question is about `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
};
