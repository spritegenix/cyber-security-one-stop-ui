import type { Metadata } from "next";
import { Roboto, Sofia } from "next/font/google";
import "./css/globals.css";
import "./css/lineAnimation.css";
import "./css/loader.css";
import "./css/humMenu.css";
import "./css/typeHead.css";
import "./css/swiper.css";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import Script from "next/script";
import Env from "@/lib/env";

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
  description:
    "Explore and connect with top firms and individual experts specializing in categories like Financial Fraud, Cybersecurity, Legal Consultancy, and more. Discover trusted professionals to help solve your challenges and secure your interests.",
  metadataBase: new URL(Env.BASE_URL),

  twitter: {
    card: "summary_large_image",
    site: "cybersecurityonestop.com",
    title: "Cyber Security | One stop Solution",
    description:
      "Explore and connect with top firms and individual experts specializing in categories like Financial Fraud, Cybersecurity, Legal Consultancy, and more. Discover trusted professionals to help solve your challenges and secure your interests.",
    images: ["screenshots/homePage.png"],
  },
  openGraph: {
    title: "Cyber Security | One stop Solution",
    type: "website",
    locale: "en_US",
    siteName: "Cyber Security",
    description:
      "Explore and connect with top firms and individual experts specializing in categories like Financial Fraud, Cybersecurity, Legal Consultancy, and more. Discover trusted professionals to help solve your challenges and secure your interests.",
    images: [
      {
        url: "screenshots/homePage.png",
        width: 1200,
        height: 600,
        alt: "Cyber Security - One Stop Solution",
      },
    ],
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
        className={`${roboto.variable} ${font1.variable} relative scroll-smooth bg-bg1/5 antialiased`}
      >
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
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
