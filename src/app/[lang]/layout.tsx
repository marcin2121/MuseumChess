import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "../globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isPolish = lang === "pl";
  return {
    title: isPolish ? "Muzeum Szachów" : "Chess Museum",
    description: isPolish
      ? "Wirtualna Galeria / Showcase dla unikalnych zestawów szachowych"
      : "Virtual Gallery / Showcase for unique chess sets",
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body
        className={`${outfit.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
