import Header from "@/Components/Layout/Header";
import Footer from "@/Components/Layout/Footer";
import ReactQueryProvider from "@/Provider/ReactQueryProvider";

import "./globals.css";

export const metadata = {
  title: "تورینو",
  description: "سفر به راحتی چند کلیلک!",
  icons: {
    icon: "/image/cover.svg",
  },
  openGraph: {
    title: "تورینو",
    description: "سفر به راحتی چند کلیک!",
    url: "https://torino.ir",
    type: "website",
    images: ["/images/cover.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "تورینو",
    description: "سفر به راحتی چند کلیک!",
    images: ["/images/cover.png"],
  },
  themeColor: "#28A745",
};


export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ReactQueryProvider>
          <Header />
          {children}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
