import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
