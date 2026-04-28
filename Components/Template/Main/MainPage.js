"use client";
import { useState, useCallback } from "react";
import Header from "@/Components/Module/HeaderDate/Header";
import BookDate from "@/Components/Module/BookDate/BookDate";
import ShowTours from "@/Components/Module/ShowTours/ShowTours";
import PhoneReseved from "@/Components/Module/Static/PhoneReseved";
import TourSlider from "@/Components/Module/Static/TourSlider";
import WebInfo from "@/Components/Module/Static/WebInfo";
import ServerConectionError from "../../Errors/ServerConectionError";

export default function MainPage() {
  const [displayedTours, setDisplayedTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  return (
    <div>
      {/* ✅ Header فقط وقتی خطا نیست نمایش داده می‌شود */}
      {!hasError && <Header />}
      
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