import { notFound } from "next/navigation";

import AboutUs from "@/Components/Template/Links/AboutUs";
import ContactUs from "@/Components/Template/Links/ContactUs";
import Ques from "@/Components/Template/Links/Ques";
import SafeTravel from "@/Components/Template/Links/SafeTravel";

export const dynamicParams = false;

const pages = {
  "about-us": AboutUs,
  contact: ContactUs,
  faq: Ques,
  insurance: SafeTravel,
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
