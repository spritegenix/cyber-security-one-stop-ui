import { ad, clock, contact, images, profile, service1, share, user } from "@/assets";

export const individualBusinessSample = {
  id: 1,
  name: "Cybross Private Ltd.",
  avatar: user,
  coverPhoto: service1,
  description: `Cybross Private Ltd. has an experienced corporate attorney with over 15 years of expertise in business law, contract negotiations, and regulatory compliance. Based in New York City, John specializes in helping startups, SMEs, and multinational corporations navigate complex legal challenges.
With a strong focus on delivering practical solutions, John has successfully handled over 200 high-stakes cases, ensuring favorable outcomes for his clients. His approachable demeanor, meticulous attention to detail, and deep understanding of the law make him a trusted advisor in the legal community.

In addition to his legal practice, John is an advocate for pro bono work, offering free legal aid to underprivileged entrepreneurs and nonprofits. When he's not in the courtroom, John enjoys mentoring young lawyers, speaking at industry conferences, and staying updated on evolving corporate laws.`,
  rating: 4.5,
  reviews: 100,
  location: "Delhi, India",
  locationArray: ["Delhi, India", "Delhi, India", "Delhi, India"],
  phonePri: "+91 9876543210",
  emailPri: "2A2m5@example.com",
  phoneArray: ["+91 9876543210", "+91 9876543210"],
  emailArray: ["2A2m5@example.com", "2A2m5@example.com"],
  website: "https://example.com",
  socials: [
    "https://www.facebook.com/CyberSecurity",
    "https://twitter.com/CyberSecurity",
    "https://www.instagram.com/CyberSecurity/",
    "https://www.linkedin.com/school/CyberSecurity/",
    "https://www.youtube.com/c/CyberSecurity",
  ],
  languages: ["English", "Spanish"],
  profilePic: user,
  coverPhotos: [service1, user, service1, user, service1, user, service1, user],
  idVerification: user,
  registrationCertificate: user,
  subscriptionPackages: [1, 2, 3],
  adBanners: [1, 2, 3],
  mobileAdBanners: [1, 2, 3],
  consultationTiming: {
    monday: { start: "", end: "", checked: true },
    tuesday: { start: "", end: "", checked: true },
    wednesday: { start: "", end: "15:30", checked: true },
    thursday: { start: "15:29", end: "", checked: true },
    friday: { start: "", end: "", checked: true },
    saturday: { start: "", end: "", checked: false },
    sunday: { start: "", end: "", checked: false },
  },
  practiceAreas: [
    "Criminal Defense",
    "Employment and Labor Law",
    "Family Law",
    "Intellectual Property (IP) Law",
    "Personal Injury Law",
    "Real Estate Law",
    "Tax Law",
  ],
  practiceCourts: ["Circuit Court", "High Court", "Supreme Court"],
  yearsOfExperience: "10",
  teamSize: "10",
  languageProficiency: ["English", "Spanish"],
  academicDegree: ["Bachelor of Laws", "Master of Laws"],
  licenseNumber: "123 456 7890",
};

// Registration Number
// License/Bar Number (for individual lawyers)
// Practice Areas (multi-select for specialization areas, e.g., Family Law, Criminal Law, Corporate Law)
// Practice Courts (multi-select for law courts e.g. Circuit Court, High Court, Supreme Court)
// Years of Experience
// Team Size (for Law Firms)
// Language Proficiency (if relevant, for multi-lingual clients)
// Academic Degree

// // Additional Information
// Profile Picture
// Bio/Description (text area for summary of experience and skills)
// Website URL
// Cover Photos (multiple)
// Social Media Links (optional for LinkedIn, Twitter, etc.)

// // Compliance & Documentation
// ID Verification Document (file upload for ID proof for individuals)
// Registration Certificate (file upload for law firms)

// Subscription Packages (if applicable)
// Desktop adBanners
// Mobile adBanners
