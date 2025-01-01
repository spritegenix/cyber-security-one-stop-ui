import {
  adBanner1,
  cat1,
  cat10,
  cat14,
  cat15,
  cat16,
  cat17,
  cat18,
  cat2,
  cat20,
  cat3,
  cat4,
  cat5,
  cat6,
  cat7,
  user,
} from "@/assets";
import { AiFillGitlab, AiFillGold } from "react-icons/ai";
import { IoMdPhotos } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBusinessCenter } from "react-icons/md";

export const categoryArray = [
  {
    id: 1,
    label: "Financial Fraud",
    href: "/services/financial-fraud",
    icon: cat10,
    description:
      "Investigations into financial misrepresentations, embezzlements, and related frauds.",
  },
  {
    id: 2,
    label: "Social Media Fraud",
    href: "/services/social-media-fraud",
    icon: cat2,
    description:
      "Protecting individuals and businesses from scams and impersonations on social media.",
  },
  {
    id: 3,
    label: "Organized Fraud",
    href: "/services/organized-fraud",
    icon: cat14,
    description: "Detecting and disrupting large-scale fraud operations and criminal networks.",
  },
  {
    id: 4,
    label: "Blackmailing and Extortion",
    href: "/services/blackmailing-extortion",
    icon: cat3,
    description: "Handling cases of threats, coercion, and forced payments due to blackmail.",
  },
  {
    id: 5,
    label: "Corporate Fraud",
    href: "/services/corporate-fraud",
    icon: cat1,
    description:
      "Investigative services targeting fraud and misconduct within corporate environments.",
  },
  {
    id: 6,
    label: "Wildlife Forensic",
    href: "/services/wildlife-forensic",
    icon: cat5,
    description:
      "Specialized investigations to combat wildlife crimes and protect endangered species.",
  },
  {
    id: 7,
    label: "On-Site Investigation",
    href: "/services/on-site-investigation",
    icon: cat1,
    description: "Direct, in-person investigations at the crime or fraud scene.",
  },
  {
    id: 8,
    label: "Legal Consultancy",
    href: "/services/legal-consultancy",
    icon: cat15,
    description:
      "Expert legal advice on issues related to fraud, cybercrime, and corporate compliance.",
  },
  {
    id: 9,
    label: "Cyber Fraud and Cybersecurity",
    href: "/services/cyber-fraud-cybersecurity",
    icon: cat6,
    description: "Defending against cybercrimes, data breaches, and securing digital assets.",
  },
  {
    id: 10,
    label: "Insurance Fraud",
    href: "/services/insurance-fraud",
    icon: cat10,
    description: "Detecting fraudulent claims and misconduct in the insurance industry.",
  },
  {
    id: 11,
    label: "Employee Fraud and Theft",
    href: "/services/employee-fraud-theft",
    icon: cat4,
    description: "Investigations into employee theft, misuse of resources, and insider fraud.",
  },
  {
    id: 12,
    label: "Digital Forensic Services",
    href: "/services/digital-forensic-services",
    icon: cat16,
    description: "Recovering, analyzing, and preserving digital evidence in various cases.",
  },
  {
    id: 13,
    label: "Intellectual Property Fraud",
    href: "/services/intellectual-property-fraud",
    icon: cat7,
    description: "Safeguarding IP rights against counterfeiters, piracy, and other IP crimes.",
  },
  {
    id: 14,
    label: "Due Diligence Investigations",
    href: "/services/due-diligence-investigations",
    icon: cat17,
    description:
      "Comprehensive investigations to assess risks in investments, mergers, or partnerships.",
  },
  {
    id: 15,
    label: "Tax Fraud",
    href: "/services/tax-fraud",
    icon: cat20,
    description:
      "Investigating cases of tax evasion and financial misconduct with legal implications.",
  },
];

export const testimonials = [
  {
    name: "John Smith",
    profession: "CEO, Tech Innovators",
    testimonial:
      "The services provided were exceptional. The team's attention to detail and professionalism exceeded our expectations. I highly recommend them!",
  },
  {
    name: "Emily Johnson",
    profession: "Legal Consultant, Law Associates",
    testimonial:
      "Their expertise in handling complex corporate fraud cases was impressive. They were thorough, reliable, and provided us with insightful solutions.",
  },
  {
    name: "David Thompson",
    profession: "Cybersecurity Specialist, SecureTech",
    testimonial:
      "The cybersecurity solutions offered were top-notch. Their knowledge and quick response saved us from a critical breach. A trusted partner for sure!",
  },
  {
    name: "Samantha Lee",
    profession: "COO, Wildlife Conservation Org",
    testimonial:
      "Their wildlife forensic services helped us crack down on illegal poaching. A dedicated team with outstanding investigative skills.",
  },
  {
    name: "Michael Brown",
    profession: "Insurance Claims Manager, SafeGuard",
    testimonial:
      "They provided critical insights into insurance fraud cases that saved our company a significant amount. Very professional and reliable.",
  },
  {
    name: "Jessica Williams",
    profession: "HR Manager, Global Enterprises",
    testimonial:
      "Their employee fraud investigation services were discreet and efficient. They helped us resolve sensitive issues with great care and professionalism.",
  },
];

export const servicesListingAdBanners = [
  {
    id: 1,
    wideImage: adBanner1,
    mobileImage: adBanner1,
    href: "#",
  },
  {
    id: 2,
    wideImage: adBanner1,
    mobileImage: adBanner1,
    href: "#",
  },
  {
    id: 3,
    wideImage: adBanner1,
    mobileImage: adBanner1,
    href: "#",
  },
];

export const FirmDashboard = {
  tabs: [
    {
      id: "1",
      label: "Basic Information",
      icon: <AiFillGitlab />,
    },
    {
      id: "2",
      label: "Professional Details",
      icon: <MdBusinessCenter />,
    },
    {
      id: "3",
      label: "Additional Information",
      icon: <AiFillGold />,
    },
    {
      id: "4",
      label: "Cover Photos",
      icon: <IoMdPhotos />,
    },
    {
      id: "5",
      label: "Verification Documents",
      icon: <IoDocuments />,
    },
  ],
};

export const indianStatesAndUTs = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export const countries = ["bharat"];

export const courtTypes = [
  "Civil Court",
  "Criminal Court",
  "High Court",
  "Consumer Court",
  "District Court",
  "Family Court",
  "Labour Court",
  "Session Court",
  "Magistrate Court",
  "Supreme Court",
  "Bombay High Court",
  "Chandigarh High Court",
];

export const legalServices = [
  "Corporate Law",
  "Intellectual Property (IP) Law",
  "Employment and Labor Law",
  "Real Estate Law",
  "Family Law",
  "Criminal Defense",
  "Immigration Law",
  "Tax Law",
  "Personal Injury Law",
  "Estate Planning and Probate",
  "Bankruptcy Law",
  "Environmental Law",
  "Contract Law",
  "Medical Malpractice",
  "Consumer Protection Law",
  "Civil Rights Law",
  "Entertainment Law",
  "Construction Law",
  "Insurance Law",
  "International Law",
  "Cybersecurity and Data Privacy",
  "Litigation and Dispute Resolution",
  "Mergers and Acquisitions",
  "Alternative Dispute Resolution (ADR)",
  "Education Law",
  "Administrative Law",
  "Elder Law",
  "Social Security Disability Law",
  "Antitrust and Competition Law",
  "Human Rights Law",
  "Maritime and Admiralty Law",
  "Healthcare Law",
  "Securities Law",
  "Agricultural Law",
  "Telecommunications Law",
  "Transportation Law",
  "Gaming Law",
];

export const languageProficiencyIndia = [
  "Hindi", // Official language of India
  "English", // Associate official language
  "Bengali", // Language of West Bengal, Assam
  "Telugu", // Language of Andhra Pradesh and Telangana
  "Marathi", // Language of Maharashtra
  "Tamil", // Language of Tamil Nadu
  "Urdu", // Spoken across North India, especially in Uttar Pradesh, Bihar
  "Gujarati", // Language of Gujarat
  "Malayalam", // Language of Kerala
  "Kannada", // Language of Karnataka
  "Odia", // Language of Odisha
  "Punjabi", // Language of Punjab
  "Assamese", // Language of Assam
  "Sanskrit", // Classical language of India, used in Vedic and classical texts
  "Kashmiri", // Language of Jammu and Kashmir
  "Nepali", // Spoken in parts of West Bengal and Sikkim
  "Sindhi", // Spoken by Sindhi community
  "Dogri", // Language of Jammu region
  "Manipuri", // Language of Manipur
  "Bodo", // Language of Assam
  "Santhali", // Language of Jharkhand, Odisha, and Bengal
  "Konkani", // Language spoken in Goa and parts of Maharashtra
  "Maithili", // Language of Bihar
  "Rajasthani", // Language of Rajasthan
  "Haryanvi", // Language of Haryana
  "Mizo", // Language of Mizoram
  "Tulu", // Language spoken in parts of Karnataka and Kerala
  "Khasi", // Language of Meghalaya
  "Sikkimese", // Language of Sikkim
];

export const loggedUser = {
  name: "Pankaj Kumar",
  avatar: user,
  jwt: "1234",
  review: {
    rating: 4,
    reviewText: "This lawyer is outstanding! Highly recommended.",
  },
  phone: "1234567890",
  isPhoneVerified: true,
  isEmailVerified: true,
  email: "4Qg4g@example.com",
  address: "123 Street, City, State, Country",
  slug: "pankaj-kumar",
};

export const subscriptionPage = {
  title: "Empower Your Visibility",
  description:
    "Choose a subscription plan that best fits your needs and start showcasing your services to a broader audience.",
  features: ["Ads placement.", "Priority support.", "Featured listing benefits."],
  plans: [
    {
      id: 1,
      title: "Monthly",
      description:
        "Perfect for individuals or firms looking for short-term exposure or testing out the platform.",
      monthlyPrice: "100",
      totalPrice: "100",
    },
    {
      id: 2,
      title: "Quarterly",
      description:
        "Ideal for professionals aiming for a steady and reliable presence while saving significantly on costs.",
      monthlyPrice: "90",
      totalPrice: "350",
    },
    {
      id: 3,
      title: "Yearly",
      description:
        "Perfect for individuals or firms looking to grow their presence and reach a wider audience.",
      monthlyPrice: "80",
      totalPrice: "1000",
    },
  ],
  testimonials: [
    {
      name: "John Smith",
      profession: "CEO, Tech Innovators",
      testimonial:
        "The subscription has been a game-changer for our firm. It's affordable and delivers incredible value, helping us connect with more clients efficiently!",
    },
    {
      name: "Sarah Johnson",
      profession: "Legal Consultant",
      testimonial:
        "This platform has streamlined the way I manage and promote my services. The quarterly plan is perfect for testing the waters, and the results have been fantastic!",
    },
    {
      name: "Amit Gupta",
      profession: "Founder, Gupta Law Associates",
      testimonial:
        "Switching to the annual subscription was the best decision for our firm. It's cost-effective and offers all the tools we need to grow and succeed.",
    },
    {
      name: "Emily Carter",
      profession: "Freelance Advocate",
      testimonial:
        "The monthly plan allowed me to start small and gradually scale up. The platform's features are intuitive and truly cater to individual professionals like me.",
    },
    {
      name: "Ravi Sharma",
      profession: "Corporate Lawyer",
      testimonial:
        "I appreciate the flexibility in subscription options. The yearly plan has been ideal for maintaining a consistent online presence and attracting high-quality clients.",
    },
  ],
  faqs: [
    {
      question: "What are the subscription options available?",
      answer:
        "We offer three flexible subscription plans: Monthly, Quarterly, and Yearly. Each plan is designed to cater to different needs and budgets.",
    },
    {
      question: "Can I switch between subscription plans?",
      answer:
        "Yes, you can upgrade or downgrade your subscription plan at any time. The changes will take effect at the start of the next billing cycle.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept various payment methods, including credit cards, debit cards, and online payment platforms like PayPal.",
    },
    {
      question: "Is there a refund policy for subscriptions?",
      answer:
        "We do not offer refunds for subscriptions, but you can cancel your plan anytime to avoid future charges.",
    },
    {
      question: "Do I get any additional benefits with a yearly plan?",
      answer:
        "Yes, the yearly plan offers significant savings compared to the monthly and quarterly plans, making it ideal for long-term commitments.",
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer:
        "Yes, you can cancel your subscription anytime through your account settings. Your subscription will remain active until the end of the billing period.",
    },
    {
      question: "Will I receive reminders before my subscription renews?",
      answer:
        "Yes, we send email reminders before your subscription is renewed, so you can manage your subscription accordingly.",
    },
    {
      question: "How do I contact support for subscription-related issues?",
      answer:
        "You can reach out to our support team via email or our live chat option. We're here to assist you with any concerns.",
    },
    {
      question: "Can multiple team members use a single subscription?",
      answer:
        "No, subscriptions are tied to individual accounts. However, you can contact us for team or enterprise solutions.",
    },
    {
      question: "What happens if I don't renew my subscription?",
      answer:
        "If you don't renew, your access to premium features will be restricted, and your account will revert to the free plan.",
    },
  ],
};
