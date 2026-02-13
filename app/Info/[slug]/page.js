// import AboutUs from '@/Components/Template/Links/AboutUs'
// import BuyingGuide from '@/Components/Template/Links/BuyingGuide'
// import ContactUs from '@/Components/Template/Links/ContactUs'
// import OnlineSup from '@/Components/Template/Links/OnlineSup'
// import Ques from '@/Components/Template/Links/Ques'
// import ReturnMoney from '@/Components/Template/Links/ReturnMoney'
// import SafeTravel from '@/Components/Template/Links/SafeTravel'
// import TourismSer from '@/Components/Template/Links/TourismSer'
// import WhyTorino from '@/Components/Template/Links/WhyTorino'

// import React from 'react'

// function page() {
//   return (
//     <div>
//       <AboutUs />
//       <BuyingGuide/>
//       <ContactUs />
//       <OnlineSup/>
//       <Ques/>
//       <ReturnMoney />
//       <SafeTravel/>
//       <TourismSer/>
//       <WhyTorino/>

//     </div>
//   )
// }

// export default page




import { notFound } from "next/navigation";

import AboutUs from "@/Components/Template/Links/AboutUs";
import ContactUs from "@/Components/Template/Links/ContactUs";
import Ques from "@/Components/Template/Links/Ques";
import SafeTravel from "@/Components/Template/Links/SafeTravel";

export const dynamicParams = false;

const pages = {
  "about-us": AboutUs,
  "contact": ContactUs,
  "faq": Ques,
  "insurance": SafeTravel,
};

export async function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const Component = pages[slug];

  if (!Component) return notFound();

  return <Component />;
}