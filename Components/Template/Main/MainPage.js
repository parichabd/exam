"use client";
import { useState } from "react";
import dynamic from "next/dynamic"; // ← اضافه کردن

import Header from "@/Components/Module/HeaderDate/Header";
import BookDate from "@/Components/Module/BookDate/BookDate";
import ShowTours from "@/Components/Module/ShowTours/ShowTours";
import PhoneReseved from "@/Components/Module/Static/PhoneReseved";
import TourSlider from "@/Components/Module/Static/TourSlider";
import WebInfo from "@/Components/Module/Static/WebInfo";

// ✅ کامپوننت‌های خطا را داینامیک import کنید
const ServerConectionError = dynamic(
  () => import("@/Components/Errors/ServerConectionError"),
  {
    loading: () => <div>Loading...</div>,
    ssr: false, // چون کامپوننت خطا نیازی به SSR ندارد
  }
);

const PageNotfoundError = dynamic(
  () => import("../../Errors/ServerConectionError"),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
);

export default function MainPage() {
  const [displayedTours, setDisplayedTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div>
      <Header />
      
      {hasError ? (
        <ServerConectionError />
      ) : (
        <>
          <BookDate 
            setFoundTours={setDisplayedTours} 
            setIsLoading={setIsLoading}
            setHasError={handleError}
          />
          <ShowTours 
            tours={displayedTours} 
            isLoading={isLoading}
          />
          <PhoneReseved />
          <TourSlider />
          <WebInfo />
        </>
      )}
    </div>
  );
}