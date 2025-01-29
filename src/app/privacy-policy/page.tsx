import React from "react";
import type { Metadata } from "next";
import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Privacy Policy | Cybersecurity One Stop",
  description:
    "Read Cybersecurity One Stop's Privacy Policy to understand how we protect your data while offering fraud prevention and cybersecurity services.",
};

export default function PrivacyPolicy() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <Wrapper isTop={true}>
        <div className="mx-auto max-w-4xl p-6">
          <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>
          <p className="mb-4">
            Welcome to <strong>Cybersecurity One Stop</strong>. Your privacy is our priority. This
            Privacy Policy explains how we collect, use, and protect your information when you use
            our fraud prevention and cybersecurity services.
          </p>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">1. Information We Collect</h2>
          <p>We collect information to provide and improve our services, including:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>
              <strong>Personal Information:</strong> Name, email, contact details when you sign up.
            </li>
            <li>
              <strong>Fraud-Related Data:</strong> Details about reported fraud incidents.
            </li>
            <li>
              <strong>Usage Data:</strong> Analytics, IP addresses, and device details for security
              monitoring.
            </li>
          </ul>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">2. How We Use Your Information</h2>
          <p>We use collected data to:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Provide fraud detection and cybersecurity services.</li>
            <li>Enhance platform security and prevent cyber threats.</li>
            <li>Communicate updates, security alerts, and fraud prevention tips.</li>
          </ul>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">3. Data Protection & Security</h2>
          <p>
            We implement strict security measures to safeguard your data, including encryption,
            secure servers, and access controls to prevent unauthorized access.
          </p>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">4. Third-Party Sharing</h2>
          <p>
            We do <strong>not</strong> sell or rent your personal data. We may share information
            with:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Law enforcement agencies (if legally required).</li>
            <li>Trusted cybersecurity partners for fraud investigations.</li>
          </ul>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Request access, correction, or deletion of your data.</li>
            <li>Opt out of non-essential communications.</li>
          </ul>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">6. Cookies & Tracking Technologies</h2>
          <p>
            We use cookies to enhance user experience and security. You can manage cookie
            preferences in your browser settings.
          </p>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">7. Changes to this Policy</h2>
          <p>
            We may update this Privacy Policy to reflect changes in laws or our services. Check this
            page regularly for updates.
          </p>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, contact us at:
            <a href="mailto:info@cybersecurityonestop.com" className="text-blue-600">
              info@cybersecurityonestop.com
            </a>
            .
          </p>
        </div>
      </Wrapper>
    </Layout>
  );
}
