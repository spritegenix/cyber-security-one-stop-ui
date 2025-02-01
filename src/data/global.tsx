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
    groupedName: "Financial Frauds",
    icon: "MoneyIcon", // Replace with your desired icon name
    description:
      "Investigates deceptive practices such as investment scams, embezzlement, and money laundering.",
  },
  {
    id: 2,
    label: "Investment Fraud",
    href: "/services/investment-fraud",
    groupedName: "Financial Frauds",
    icon: "GraphIcon",
    description:
      "Investigates Ponzi schemes, pyramid schemes, and other fraudulent investment opportunities.",
  },
  {
    id: 3,
    label: "Credit Card Fraud",
    href: "/services/credit-card-fraud",
    groupedName: "Financial Frauds",
    icon: "CreditCardIcon",
    description:
      "Investigates unauthorized transactions, skimming, and other forms of payment card exploitation.",
  },
  {
    id: 4,
    label: "Tax Fraud",
    href: "/services/tax-fraud",
    groupedName: "Financial Frauds",
    icon: "TaxIcon",
    description:
      "Identifies fraudulent activities related to tax evasion, refund scams, and document falsification.",
  },
  {
    id: 5,
    label: "Cyber Fraud",
    href: "/services/cyber-fraud",
    groupedName: "Digital Frauds",
    icon: "ShieldIcon",
    description:
      "Addresses hacking, ransomware, and phishing attacks aimed at stealing sensitive information.",
  },
  {
    id: 6,
    label: "Social Media Fraud",
    href: "/services/social-media-fraud",
    groupedName: "Digital Frauds",
    icon: "SocialMediaIcon",
    description:
      "Addresses identity theft, phishing schemes, and scams conducted through social media platforms.",
  },
  {
    id: 7,
    label: "Online Shopping Fraud",
    href: "/services/online-shopping-fraud",
    groupedName: "Digital Frauds",
    icon: "ShoppingCartIcon",
    description: "Protects against fake e-commerce websites, payment scams, and counterfeit goods.",
  },
  {
    id: 8,
    label: "Telecom Fraud",
    href: "/services/telecom-fraud",
    groupedName: "Digital Frauds",
    icon: "PhoneIcon",
    description:
      "Addresses scams involving phone calls, SMS phishing (smishing), and telecom service exploitation.",
  },
  {
    id: 9,
    label: "Corporate Fraud",
    href: "/services/corporate-fraud",
    groupedName: "Corporate Frauds",
    icon: "BriefcaseIcon",
    description:
      "Detects fraudulent activities within organizations, including accounting fraud and insider trading.",
  },
  {
    id: 10,
    label: "Employment Fraud",
    href: "/services/employment-fraud",
    groupedName: "Corporate Frauds",
    icon: "UserIcon",
    description:
      "Investigates fake job offers, recruitment scams, and employment-related deception.",
  },
  {
    id: 11,
    label: "Real Estate Fraud",
    href: "/services/real-estate-fraud",
    groupedName: "Property & Insurance Frauds",
    icon: "HomeIcon",
    description: "Identifies mortgage fraud, title fraud, and scams in property transactions.",
  },
  {
    id: 12,
    label: "Insurance Fraud",
    href: "/services/insurance-fraud",
    groupedName: "Property & Insurance Frauds",
    icon: "ShieldCheckIcon",
    description:
      "Uncovers false claims, staged accidents, and other fraudulent insurance activities.",
  },
  {
    id: 13,
    label: "Identity Theft",
    href: "/services/identity-theft",
    groupedName: "Identity & Relationship Frauds",
    icon: "IDIcon",
    description:
      "Focuses on cases where personal information is stolen for financial or criminal use.",
  },
  {
    id: 14,
    label: "Romance Fraud",
    href: "/services/romance-fraud",
    groupedName: "Identity & Relationship Frauds",
    icon: "HeartIcon",
    description:
      "Protects individuals from scams where fraudsters exploit emotional connections to steal money.",
  },
  {
    id: 15,
    label: "Charity Fraud",
    href: "/services/charity-fraud",
    groupedName: "Public Service Frauds",
    icon: "CharityIcon",
    description: "Exposes fake charities and donation scams that exploit public trust.",
  },
  {
    id: 16,
    label: "Healthcare Fraud",
    href: "/services/healthcare-fraud",
    groupedName: "Public Service Frauds",
    icon: "StethoscopeIcon",
    description:
      "Detects billing fraud, fake medical claims, and pharmaceutical scams in the healthcare industry.",
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

export const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (North)",
  "Korea (South)",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (formerly Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia (formerly Macedonia)",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

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
  "Afrikaans",
  "Albanian",
  "Amharic",
  "Arabic",
  "Armenian",
  "Azerbaijani",
  "Basque",
  "Belarusian",
  "Bosnian",
  "Bulgarian",
  "Catalan",
  "Cebuano",
  "Chichewa",
  "Chinese",
  "Corsican",
  "Croatian",
  "Czech",
  "Danish",
  "Dutch",
  "Esperanto",
  "Estonian",
  "Filipino",
  "Finnish",
  "French",
  "Frisian",
  "Galician",
  "Georgian",
  "German",
  "Greek",
  "Haitian Creole",
  "Hausa",
  "Hawaiian",
  "Hebrew",
  "Hmong",
  "Hungarian",
  "Icelandic",
  "Igbo",
  "Indonesian",
  "Irish",
  "Italian",
  "Japanese",
  "Javanese",
  "Kazakh",
  "Khmer",
  "Kinyarwanda",
  "Korean",
  "Kurdish",
  "Kyrgyz",
  "Lao",
  "Latin",
  "Latvian",
  "Lithuanian",
  "Luxembourgish",
  "Macedonian",
  "Malagasy",
  "Malay",
  "Maltese",
  "Maori",
  "Mongolian",
  "Myanmar (Burmese)",
  "Norwegian",
  "Pashto",
  "Persian",
  "Polish",
  "Portuguese",
  "Romanian",
  "Russian",
  "Samoan",
  "Scots Gaelic",
  "Serbian",
  "Sesotho",
  "Shona",
  "Sinhala",
  "Slovak",
  "Slovenian",
  "Somali",
  "Spanish",
  "Sundanese",
  "Swahili",
  "Swedish",
  "Tajik",
  "Thai",
  "Turkish",
  "Turkmen",
  "Ukrainian",
  "Uyghur",
  "Uzbek",
  "Vietnamese",
  "Welsh",
  "Xhosa",
  "Yiddish",
  "Yoruba",
  "Zulu",
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
      monthlyPrice: "199",
      totalPrice: "299",
    },
    {
      id: 2,
      title: "Quarterly",
      description:
        "Ideal for professionals aiming for a steady and reliable presence while saving significantly on costs.",
      monthlyPrice: "179",
      totalPrice: "716",
    },
    {
      id: 3,
      title: "Yearly",
      description:
        "Perfect for individuals or firms looking to grow their presence and reach a wider audience.",
      monthlyPrice: "149",
      totalPrice: "1788",
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
      question: "What subscription options are available for experts and firms?",
      answer:
        "We offer a single subscription plan with flexible durations: Monthly, Quarterly, and Yearly. You can choose the plan that best suits your needs.",
    },
    {
      question: "What happens if I buy another subscription before my current one expires?",
      answer:
        "Your new subscription will be added to your existing plan, extending its duration instead of replacing it. This ensures uninterrupted service.",
    },
    {
      question: "What benefits do I get with the subscription?",
      answer:
        "Subscribers gain increased visibility, priority listing, and additional features to attract more clients and grow their cybersecurity services.",
    },
    {
      question: "Can I upgrade from a monthly to a yearly subscription?",
      answer:
        "Yes, you can purchase a longer-duration subscription at any time, and it will be added to your current plan, extending its validity.",
    },
    {
      question: "How do I manage or renew my subscription?",
      answer:
        "You can check your subscription status and renew it through your account dashboard. Renewing early ensures continuous access to premium benefits.",
    },
  ],
};

export const homePageFaqs = [
  {
    question: "What is Cybersecurity One Stop?",
    answer:
      "Cybersecurity One Stop is a platform that connects users with verified cybersecurity experts specializing in fraud prevention, digital security, and risk management.",
  },
  {
    question: "How can I find and connect with a cybersecurity expert?",
    answer:
      "You can search for experts based on their specialization, location, and expertise. Once you find a suitable expert, you can connect with them directly through our platform or you can ask for a free consultation.",
  },
  {
    question: "Are the cybersecurity experts on your platform verified?",
    answer: "No, Only cybersecurity experts with green badge are verified on our platform.",
  },
  {
    question: "Is it free to search for cybersecurity experts?",
    answer:
      "Yes, searching for experts is completely free. However, consultation and services provided by experts may have their own pricing.",
  },
  {
    question: "Can businesses also use this platform?",
    answer:
      "Absolutely! Businesses can find cybersecurity consultants to help with risk assessments, compliance, and security solutions tailored to their needs.",
  },
];

export const expertFaqs = [
  {
    question: "How can I list myself or my firm on Cybersecurity One Stop?",
    answer:
      "You can sign up, create a profile, and list your services instantly without verification. However, a green badge is awarded after our team verifies your documents.",
  },
  {
    question: "What is the green badge, and how do I get it?",
    answer:
      "The green badge signifies that our team has verified your credentials. To obtain it, you need to submit relevant documents, which our team will review for authenticity.",
  },
  {
    question: "Can I receive client inquiries without verification?",
    answer:
      "Yes, you can still be listed and receive inquiries from potential clients without verification. However, verified experts with a green badge may gain more trust and visibility.",
  },
  {
    question: "Is there a fee for listing my profile?",
    answer:
      "You can list your profile for free. We also offer premium plans that provide additional visibility and features to help you attract more clients.",
  },
  {
    question: "How can I improve my profile’s visibility?",
    answer:
      "To attract more clients, complete your profile with a detailed bio, add certifications, include client testimonials, and consider applying for verification to get the green badge.",
  },
];
