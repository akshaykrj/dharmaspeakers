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
      <body className="min-h-screen flex flex-col bg-[#faf9f6] text-[#111111] antialiased leading-relaxed">
  <Header />

  {/* Main content grows to push footer down */}
  <main className="flex-1">
    {children}
  </main>

  <Footer />
</body>
    </html>
  );
}
