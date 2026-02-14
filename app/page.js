import React from "react";
import "./globals.css";

function MainPage() {
  return (
    <div>
      <h1>main page</h1>
    </div>
  );
}

export default MainPage;

// =>   error 500 simulator
// export default async function Page() {
//   if (true) throw new Error("Simulated 500");
//   return <div>صفحه اصلی</div>;
// }
