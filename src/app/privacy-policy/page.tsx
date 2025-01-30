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
          <p className="mb-4 text-gray-600">Effective Date: 1 Jan 2025</p>
          <p className="mb-4">
            Welcome to <strong>Cybersecurity One Stop</strong>. Your privacy is important to us.
            This policy explains how we collect, use, and protect your personal information when you
            use our platform.
          </p>
          <h2 className="text-xl font-semibold text-bg1">1. Information We Collect</h2>
          <p className="mt-2">
            We collect information from both users searching for cybersecurity experts and
            professionals listing their services:
          </p>

          <ul className="mt-2 list-disc pl-6">
            <li>
              <strong>Users:</strong> Name, email, contact details, and search preferences.
            </li>
            <li>
              <strong>Experts/Firms:</strong> Name, business details, expertise, uploaded documents
              (for verification), and subscription details.
            </li>
            <li>
              Login details via Google OAuth (if used) may include name, email, and profile picture.
            </li>
            <li>Payment details (processed securely via third-party providers).</li>
          </ul>
          <h2 className="mt-6 text-xl font-semibold text-bg1">2. How We Use Your Information</h2>
          <ul className="mt-2 list-disc pl-6">
            <li>To connect users with cybersecurity experts and firms.</li>
            <li>To verify and provide a green badge to professionals.</li>
            <li>To process subscriptions and manage user profiles.</li>
            <li>To improve our platform and personalize your experience.</li>
            <li>To send important updates, offers, or security alerts.</li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold text-bg1">3. Data Protection & Security</h2>
          <p className="mt-2">
            We take security seriously. Your data is stored securely, and payment transactions are
            handled through encrypted third-party gateways. However, we advise all users to
            safeguard their login credentials.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-bg1">4. Account & Subscription</h2>
          <ul className="mt-2 list-disc pl-6">
            <li>Users and experts can delete their accounts upon request.</li>
            <li>Experts can list their services for free or subscribe to a premium plan.</li>
            <li>
              Subscriptions (monthly, quarterly, yearly) extend upon renewal instead of replacing
              the previous one.
            </li>
            <li>The green badge is awarded only after document verification by our team.</li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold text-bg1">5. Cookies & Tracking</h2>
          <p className="mt-2">
            We use cookies to enhance your browsing experience. You can disable cookies in your
            browser settings, but some features may not work properly.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-bg1">6. Third-Party Services</h2>
          <p className="mt-2">
            We do not sell your data. However, we may share information with trusted third-party
            services for payment processing, analytics, and authentication.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-bg1">7. Your Rights</h2>
          <p className="mt-2">As a user or expert, you have the right to:</p>
          <ul className="mt-2 list-disc pl-6">
            <li>Access, modify, or delete your personal data.</li>
            <li>Request verification for the green badge.</li>
            <li>Manage your subscription preferences.</li>
            <li>Opt out of marketing emails.</li>
          </ul>

          <h2 className="mt-6 text-xl font-semibold text-bg1">8. Changes to This Policy</h2>
          <p className="mt-2">
            We may update this privacy policy from time to time. We encourage you to review it
            periodically.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-bg1">9. Contact Us</h2>
          <p className="mt-2">
            If you have any questions, please contact us at{" "}
            <strong className="text-blue-500">info@cybersecurityonestop.com</strong>.
          </p>
        </div>
      </Wrapper>
    </Layout>
  );
}
