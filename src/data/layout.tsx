import { FaPhoneAlt } from "react-icons/fa";
import { GoCodeReview } from "react-icons/go";
import { LiaBullhornSolid } from "react-icons/lia";
import { MdOutlineAutoGraph } from "react-icons/md";

export const header = {
  upperNav: [
    {
      id: 1,
      icon: <MdOutlineAutoGraph />,
      label: "Advertise",
      href: "/subscription",
      subNav: [],
    },
    {
      id: 2,
      icon: <LiaBullhornSolid />,
      label: "Free Listing",
      href: "/listing-signup",
      subNav: [],
    },
    {
      id: 3,
      icon: <GoCodeReview />,
      label: "Feedback",
      href: "/feedback/user",
      subNav: [],
    },
  ],
  lowerNav: [
    {
      id: 1,
      label: "Finance & Corp Fraud",
      href: "#",
      subNav: [
        {
          id: 11,
          label: "Finance Fraud",
          href: "/services/financial-fraud",
        },
        {
          id: 12,
          label: "Corporate Fraud",
          href: "/services/corporate-fraud",
        },
        {
          id: 13,
          label: "Tax Fraud",
          href: "/services/tax-fraud",
        },
        {
          id: 14,
          label: "Insurance Fraud",
          href: "/services/insurance-fraud",
        },
      ],
    },
    {
      id: 2,
      label: "Cyber & Digital Fraud",
      href: "#",
      subNav: [
        {
          id: 21,
          label: "Cyber Fraud",
          href: "/services/cyber-fraud",
        },
        {
          id: 22,
          label: "Social Media Fraud",
          href: "/services/social-media-fraud",
        },
        {
          id: 23,
          label: "Digital Forensic Services",
          href: "/services/digital-forensic",
        },
        {
          id: 24,
          label: "Intellectual Property Fraud",
          href: "/services/intellectual-property-fraud",
        },
      ],
    },
    {
      id: 3,
      label: "Criminal & Org",
      href: "#",
      subNav: [
        {
          id: 31,
          label: "Organized Fraud",
          href: "/services/organized-fraud",
        },
        {
          id: 32,
          label: "Blackmailing & Extortion",
          href: "/services/blackmailing",
        },
        {
          id: 33,
          label: "Employee Fraud & Theft",
          href: "/services/employee-fraud",
        },
      ],
    },
    {
      id: 4,
      label: "Wildlife & Env Forensics",
      href: "#",
      subNav: [
        {
          id: 41,
          label: "Wildlife Forensics",
          href: "/services/wildlife-forensic",
        },
      ],
    },
    {
      id: 5,
      label: "Legal & Forensic",
      href: "#",
      subNav: [
        {
          id: 51,
          label: "Legal Consultancy",
          href: "/services/legal-consultancy",
        },
        {
          id: 52,
          label: "Due Diligence Investigations",
          href: "/services/due-diligence",
        },
      ],
    },
    {
      id: 6,
      label: "On-Site",
      href: "#",
      subNav: [
        {
          id: 61,
          label: "Physical Surveillance",
          href: "/services/physical-surveillance",
        },
      ],
    },
  ],
};

export const header2 = {
  upperNav: [
    {
      id: 1,
      icon: <FaPhoneAlt />,
      label: "+91 8957865554",
      href: "tel:+91 8957865554",
      iconStyle: "trin-trin",
      subNav: [],
    },
    {
      id: 22,
      icon: <MdOutlineAutoGraph />,
      label: "Advertise",
      href: "/subscription",
      subNav: [],
    },
    {
      id: 6,
      icon: <GoCodeReview />,
      label: "Feedback",
      href: "/feedback/firm",
      iconStyle: "",
      subNav: [],
    },
  ],
};
export const footer = {
  text: "Connect with trusted fraud experts for Financial Fraud, Social Media Scams, Corporate Fraud, and more. Find reliable solutions to safeguard your assets and ensure peace of mind.",
  contactDetails: {
    contactNo: "+91 8957865554",
    email: "info@cybersecurity.com",
    location:
      "A Wing, Flat Nos 13, Suman Youngsters CHS, Opp. Agarwal Residency Apt Gate, Shankar Lane, Kandivali West, Mumbai- 400067.",
  },
  socials: {
    facebook: "https://www.facebook.com/CyberSecurity",
    twitter: "https://twitter.com/CyberSecurity",
    instagram: "https://www.instagram.com/CyberSecurity/",
    linkedin: "https://www.linkedin.com/school/CyberSecurity/",
    youtube: "https://www.youtube.com/c/CyberSecurity",
  },
  copyrightText: `Copyrights © ${new Date().getFullYear()} CyberSecurity. All rights reserved.`,
  list1: {
    title: "Quick Links",
    links: [
      {
        id: 1,
        label: "Advertise",
        href: "/subscription",
      },
      {
        id: 2,
        label: "Free Listing",
        href: "/listing-signup",
      },
      {
        id: 3,
        label: "Feedback",
        href: "/feedback",
      },

      {
        id: 4,
        label: "User Login",
        href: "/login",
      },
      {
        id: 5,
        label: "Firm Login",
        href: "/listing-login",
      },
    ],
  },
  list2: {
    title: "Categories",
    links: [
      {
        id: 11,
        label: "Finance Fraud",
        href: "/services/financial-fraud",
      },
      {
        id: 12,
        label: "Corporate Fraud",
        href: "/services/corporate-fraud",
      },
      {
        id: 13,
        label: "Tax Fraud",
        href: "/services/tax-fraud",
      },
      {
        id: 14,
        label: "Insurance Fraud",
        href: "/services/insurance-fraud",
      },
    ],
  },
  list3: {
    title: "Downloads",
    links: [
      {
        id: 1,
        label: "iOS",
        href: "/",
      },
      {
        id: 2,
        label: "Android",
        href: "/",
      },
      {
        id: 3,
        label: "Mac",
        href: "/",
      },
      {
        id: 4,
        label: "Window",
        href: "/",
      },
    ],
  },
};
