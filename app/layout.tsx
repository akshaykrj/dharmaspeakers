import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-[#2B2B2B] antialiased leading-relaxed">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
