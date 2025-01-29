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
          <p className="mb-4">
            Welcome to <strong>Cybersecurity One Stop</strong>. By accessing or using our services,
            you agree to comply with the following Terms and Conditions. If you do not agree, please
            refrain from using our platform.
          </p>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">1. Use of Our Services</h2>
          <p>
            Our platform provides cybersecurity and fraud prevention solutions. You agree to use our
            services only for lawful purposes and in compliance with these terms.
          </p>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">2. User Responsibilities</h2>
          <p>You agree to:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Provide accurate and truthful information when using our services.</li>
            <li>Not engage in fraudulent activities or violate any laws.</li>
            <li>Respect the privacy and security of other users.</li>
          </ul>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">3. Account Security</h2>
          <p>
            If you create an account, you are responsible for maintaining its confidentiality. We
            are not liable for unauthorized account access due to user negligence.
          </p>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">4. Prohibited Activities</h2>
          <p>You may not:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Use our platform for illegal activities, hacking, or fraud.</li>
            <li>Distribute harmful software or engage in cyber threats.</li>
            <li>Misuse any cybersecurity tools provided by us.</li>
          </ul>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">5. Intellectual Property</h2>
          <p>
            All content, trademarks, and materials on this platform are the property of
            <strong> Cybersecurity One Stop</strong>. Unauthorized use is strictly prohibited.
          </p>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">6. Limitation of Liability</h2>
          <p>
            We strive to provide accurate information and secure services. However, we are not
            responsible for damages resulting from security breaches, cyberattacks, or misuse of our
            platform.
          </p>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">7. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party sites. We do not endorse or control these
            sites and are not responsible for their content or security.
          </p>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">8. Changes to Terms</h2>
          <p>
            We may update these Terms and Conditions at any time. Continued use of our platform
            signifies acceptance of any modifications.
          </p>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">9. Termination</h2>
          <p>
            We reserve the right to terminate or suspend accounts that violate these terms or engage
            in fraudulent activities.
          </p>

          <h2 className="mb-2 mt-6 text-2xl font-semibold">10. Contact Information</h2>
          <p>
            If you have any questions about our Terms and Conditions, contact us at:
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
