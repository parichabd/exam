"use client";
import { useState } from "react";
import Header from "@/Components/Module/HeaderDate/Header";
import BookDate from "@/Components/Module/BookDate/BookDate";
import ShowTours from "@/Components/Module/ShowTours/ShowTours";

export default function MainPage() {
  const [foundTours, setFoundTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Header />
      <BookDate setFoundTours={setFoundTours} setIsLoading={setIsLoading} />
      <ShowTours tours={foundTours} isLoading={isLoading} />
    </div>
  );
}