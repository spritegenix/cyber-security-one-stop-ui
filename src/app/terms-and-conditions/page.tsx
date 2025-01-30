import React from "react";
import type { Metadata } from "next";
import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Terms and Conditions | Cybersecurity One Stop",
  description:
    "Read Cybersecurity One Stop's Terms and Conditions to understand our fraud prevention and cybersecurity services, user responsibilities, and legal guidelines.",
};

export default function TermsAndConditions() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <Wrapper isTop={true}>
        <div className="mx-auto max-w-4xl p-6">
          <h1 className="mb-4 text-3xl font-bold">Terms and Conditions</h1>
          <p className="mb-4 text-gray-600">Effective Date: 1 Jan 2025</p>
          <p className="mt-4">
            Welcome to <strong>Cybersecurity One Stop</strong>. By accessing or using our platform,
            you agree to comply with these Terms and Conditions.
          </p>

          <h2 className="text-xl font-semibold text-bg1">1. User & Expert Responsibilities</h2>
          <p className="mt-2">By using our platform, you agree that:</p>
          <ul className="mt-2 list-disc pl-6">
            <li>
              Users can search and connect with cybersecurity experts at their own discretion.
            </li>
            <li>Experts/Firms must provide accurate and legal information on their profiles.</li>
            <li>
              Users and Experts are responsible for their own interactions outside of our platform.
            </li>
            <li>
              Cybersecurity One Stop is not responsible for disputes between users and experts.
            </li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold text-bg1">2. Expert Listing & Verification</h2>
          <ul className="mt-2 list-disc pl-6">
            <li>Experts/Firms can list their services without verification.</li>
            <li>
              Verified experts will receive a <strong>green badge</strong> after document
              verification by our team.
            </li>
            <li>Providing false information may result in account suspension.</li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold text-bg1">3. Subscription Policy</h2>
          <ul className="mt-2 list-disc pl-6">
            <li>Experts can subscribe to a single type of plan: Monthly, Quarterly, or Yearly.</li>
            <li>
              Buying a new subscription adds to the existing duration instead of replacing it.
            </li>
            <li>Subscription payments are non-refundable.</li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold text-bg1">4. Prohibited Activities</h2>
          <p className="mt-2">You agree not to:</p>
          <ul className="mt-2 list-disc pl-6">
            <li>Use our platform for fraudulent or illegal activities.</li>
            <li>Impersonate another person or misrepresent your identity.</li>
            <li>Harass, abuse, or harm other users or experts.</li>
            <li>Upload misleading, false, or inappropriate content.</li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold text-bg1">5. Limitation of Liability</h2>
          <p className="mt-2">
            Cybersecurity One Stop is a listing platform. We do not endorse or guarantee the
            accuracy of experts’ credentials or services. Any agreements or transactions made
            between users and experts are at their own risk.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-bg1">
            6. Account Suspension & Termination
          </h2>
          <ul className="mt-2 list-disc pl-6">
            <li>We reserve the right to suspend or terminate any account violating these terms.</li>
            <li>Experts providing false information may lose their verified status.</li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold text-bg1">7. Privacy & Data Usage</h2>
          <p className="mt-2">
            Your data is protected under our{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            . By using this platform, you agree to our data collection and security measures.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-bg1">8. Changes to Terms</h2>
          <p className="mt-2">
            We may update these terms periodically. Continued use of our platform implies acceptance
            of any modifications.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-bg1">9. Contact Us</h2>
          <p className="mt-2">
            If you have any questions, please contact us at{" "}
            <strong>info@cybersecurityonestop.com</strong>.
          </p>
        </div>
      </Wrapper>
    </Layout>
  );
}
