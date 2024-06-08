import React from "react";
import { HoverEffect } from "./ui/card-hover-effect";

function Quizes() {
  const categories = [
    {
      id: 9,
      name: "General Knowledge",
      img: "./categories/gk.jpeg",
    },
    {
      id: 10,
      name: "Entertainment: Books",
      img: "./categories/books.jpeg",
    },
    {
      id: 11,
      name: "Entertainment: Film",
      img: "./categories/films.jpeg",
    },
    {
      id: 12,
      name: "Entertainment: Music",
      img: "./categories/music.jpeg",
    },
    {
      id: 13,
      name: "Entertainment: Musicals & Theatres",
      img: "./categories/musicals-theatres.jpeg",
    },
    {
      id: 14,
      name: "Entertainment: Television",
      img: "./categories/tv.jpeg",
    },
    {
      id: 15,
      name: "Entertainment: Video Games",
      img: "./categories/video-game.jpeg",
    },
    {
      id: 16,
      name: "Entertainment: Board Games",
      img: "./categories/board-game.jpeg",
    },
    {
      id: 17,
      name: "Science & Nature",
      img: "./categories/nature.jpeg",
    },
    {
      id: 18,
      name: "Science: Computers",
      img: "./categories/computer.jpeg",
    },
    {
      id: 19,
      name: "Science: Mathematics",
      img: "./categories/maths.jpeg",
    },
    {
      id: 20,
      name: "Mythology",
      img: "./categories/mythology.jpeg",
    },
    {
      id: 21,
      name: "Sports",
      img: "./categories/sports.jpeg",
    },
    {
      id: 22,
      name: "Geography",
      img: "./categories/geography.jpeg",
    },
    {
      id: 23,
      name: "History",
      img: "./categories/history.jpeg",
    },
    {
      id: 24,
      name: "Politics",
      img: "./categories/politics.jpeg",
    },
    {
      id: 25,
      name: "Art",
      img: "./categories/art.jpeg",
    },
    {
      id: 26,
      name: "Celebrities",
      img: "./categories/celebrities.jpeg",
    },
    {
      id: 27,
      name: "Animals",
      img: "./categories/animal.jpeg",
    },
    {
      id: 28,
      name: "Vehicles",
      img: "./categories/vehicle.jpeg",
    },
    {
      id: 29,
      name: "Entertainment: Comics",
      img: "./categories/comics.jpeg",
    },
    {
      id: 30,
      name: "Science: Gadgets",
      img: "./categories/gadgets.jpeg",
    },
    {
      id: 31,
      name: "Entertainment: Japanese Anime & Manga",
      img: "./categories/manga.jpeg",
    },
    {
      id: 32,
      name: "Entertainment: Cartoon & Animations",
      img: "./categories/cartoon.jpeg",
    },
  ];
  const items = categories.map((category) => {
    return {
      id: category.id,
      title: category.name,
      link: `/category/${category.id}`,
      description: <img src={category.img} />,
    };
  });

  return (
    <div className="w-full bg-[#fb2e7b] dark:bg-[#4f1127]">
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={items} />
      </div>
    </div>
  );
}

export default Quizes;
