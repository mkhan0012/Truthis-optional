import { DM_Serif_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const serif = DM_Serif_Display({ 
  subsets: ["latin"], 
  weight: ["400"], 
  variable: "--font-canela" // Mapped to our theme variable
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter"
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains"
});

export const metadata = {
  title: "Reality Distortion Simulator",
  description: "Interpretation changes facts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${inter.variable} ${jetbrains.variable} bg-inkBlack text-boneWhite`}>
        {children}
      </body>
    </html>
  );
}