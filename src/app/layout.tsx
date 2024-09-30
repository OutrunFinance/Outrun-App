import { Footer } from "@/components/Footer";
import { Menu } from "@/components/Menu";
import { Providers } from "@/components/Providers";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen w-screen bg-[#030415] flex flex-col justify-between">
        <Providers>
          <Toaster containerStyle={{ marginTop: "6rem" }} />
          <Menu />
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
