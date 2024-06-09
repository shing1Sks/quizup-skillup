"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });
import { getUser } from "@/tools/getUser";
import { DifficultyProvider } from "@/Context/DifficultyContext";
DifficultyProvider.displayName = "Difficulty Provider";
import { Analytics } from "@vercel/analytics/react";
function RootLayout({ children }) {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        handleUser(userData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);
  const [user, setUser] = useState(false);
  const handleUser = (u) => {
    setUser(u);
  };
  return (
    <html lang="en" className={theme}>
      <DifficultyProvider>
        <body className={inter.className}>
          <link rel="shortcut icon" href="/qs-logo-rmbg.png" />
          <Header theme={theme} setTheme={setTheme} user={user} />
          {children}
          <Analytics />
        </body>
      </DifficultyProvider>
    </html>
  );
}
RootLayout.displayName = "RootLayout";
export default RootLayout;
