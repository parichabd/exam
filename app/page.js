import MainPage from "@/Components/Template/Main/MainPage";

import "./globals.css";

function Page() {
  return (
    <>
    <MainPage/>
    </>
  );
}

export default Page;

// =>   error 500 simulator
// export default async function Page() {
//   if (true) throw new Error("Simulated 500");
//   return <div>صفحه اصلی</div>;
// }
