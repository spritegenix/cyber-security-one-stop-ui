import type { Metadata } from "next";
import { Roboto, Sofia } from "next/font/google";
import "./css/globals.css";
import "./css/lineAnimation.css";
import "./css/loader.css";
import "./css/humMenu.css";
import "./css/typeHead.css";
import "./css/swiper.css";
import { ApolloWrapper } from "@/lib/apollo-wrapper";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--roboto",
  display: "swap",
});
const font1 = Sofia({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font1",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cyber Security | One stop Solution",
    template: "%s | Cyber Security",
  },
  description: "One stop Solution",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    title: "Cyber Security | One stop Solution",
    type: "website",
    locale: "en_US",
    siteName: "Cyber Security",
    description: "One stop Solution",
    // images: [
    //   {
    //     url: "/api/og-image/route.ts",
    //     width: 1200,
    //     height: 600,
    //     alt: "Cyber Security - One Stop Solution",
    //   },
    // ],
  },
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
  authModal,
}: Readonly<{
  children: React.ReactNode;
  authModal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${font1.variable} relative scroll-smooth bg-slate-100 antialiased`}
      >
        <ApolloWrapper>
          {/*  modal portal */}
          <div id="modal-portal" className="relative z-[999999]" />
          {/*  auth modal */}
          {authModal ? authModal : "null"}
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
