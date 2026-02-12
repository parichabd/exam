import Header from "@/Components/Layout/Header";
import "./globals.css";
import Footer from "@/Components/Layout/Footer";

export const metadata = {
  title: "تورینو",
  description: "سفر به راحتی جند کلیلک!",
  icons: {
    icon: "/image/cover.svg",   
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <Header></Header>
      <body>{children}</body>
      <Footer></Footer>
    </html>
  );
}
