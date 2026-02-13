import { notFound } from "next/navigation";

import WhyTorino from "@/Components/Template/Links/WhyTorino";
import OnlineSup from "@/Components/Template/Links/OnlineSup";
import BuyingGuide from "@/Components/Template/Links/BuyingGuide";
import ReturnMoney from "@/Components/Template/Links/ReturnMoney";
import TourismSer from "@/Components/Template/Links/TourismSer";

export const dynamicParams = false;

const pages = {
  "whyUs": WhyTorino,
  "support": OnlineSup,
  "purchase": BuyingGuide,
  "refund": ReturnMoney,
  "TourismServices": TourismSer,
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