import { z } from "zod";

export const basicInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),

  phoneNumber: z
    .string()
    .min(10, "Phone number is required")
    .regex(
      /^(\+?\d{1,4}[\s-]?)?(\(?\d{1,3}\)?[\s-]?)?\d{1,4}([\s-]?\d{1,4}){1,3}$/,
      "Invalid phone number",
    )
    .optional(),
  email: z.string().email("Invalid email address").optional(),

  alternatePhoneNumbers: z
    .array(
      z
        .string()
        .min(10, "Invalid phone number")
        .regex(
          /^(\+?\d{1,4}[\s-]?)?(\(?\d{1,3}\)?[\s-]?)?\d{1,4}([\s-]?\d{1,4}){1,3}$/,
          "Invalid phone number",
        ),
    )
    .optional(),

  addresses: z
    .array(
      z.object({
        addressId: z.string().optional(),
        streetAddress: z.string().min(1, "Street Address is required"),
        pincode: z.string().min(4, "Invalid Pincode"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        country: z.string().min(1, "Country is required"),
        priority: z.number().nonnegative("Priority is required"),
        isDeleted: z.boolean().default(false).optional(),
      }),
    )
    .optional(),
});

// Schema for the Professional Details Form
export const professionalDetailsSchema = z.object({
  registrationNumber: z.string().max(100, "Registration Number is too long").optional(),

  licenseNumber: z.string().max(100, "License/Bar Number is too long").optional(),

  // Practice Areas (Multiple selections allowed)
  practiceAreas: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .max(100, "Max 20 practice areas allowed")
    .optional(),

  // Practice Courts (Multiple selections allowed)
  practiceCourts: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .max(100, "max 20 practice courts allowed")
    .optional(),

  yearsOfExperience: z.string().optional(),

  teamSize: z.string().optional(),

  // Academic Degrees (Array of strings)
  academicDegree: z.array(z.string()).max(10, "max 5 academic degrees allowed").optional(),

  // Language Proficiency (Multiple selections allowed)
  languageProficiency: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .max(100, "max 5 language proficiency allowed")
    .optional(),
});

export const avatarSchema = z.object({
  avatar: z
    .any()
    .refine((files) => files.length > 0, "Please upload an image.")
    .refine(
      (files) => files[0]?.size <= 5000000, // 5MB limit
      "Image size should be less than 5MB.",
    )
    .refine(
      (files) => ["image/jpeg", "image/png"].includes(files[0]?.type),
      "Only JPEG and PNG images are allowed.",
    ),
});

export const additionalInformationSchema = z.object({
  bio: z.string().max(3000, "Bio/Description must be at most 3000 characters.").optional(), // Bio is optional

  websiteUrl: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(value),
      "Please enter a valid URL.",
    ),

  socialMediaLinks: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().url("Please enter a valid URL."),
        isDelete: z.boolean().default(false).optional(),
      }),
    )
    .max(10, "You can only add up to 10 social media links.") // Apply max here
    .optional(), // Then make the array optional

  dayTimings: z.object({
    monday: z.object({
      start: z.string(),
      end: z.string(),
      checked: z.boolean(),
    }),
    tuesday: z.object({
      start: z.string(),
      end: z.string(),
      checked: z.boolean(),
    }),
    wednesday: z.object({
      start: z.string(),
      end: z.string(),
      checked: z.boolean(),
    }),
    thursday: z.object({
      start: z.string(),
      end: z.string(),
      checked: z.boolean(),
    }),
    friday: z.object({
      start: z.string(),
      end: z.string(),
      checked: z.boolean(),
    }),
    saturday: z.object({
      start: z.string(),
      end: z.string(),
      checked: z.boolean(),
    }),
    sunday: z
      .object({
        start: z.string(),
        end: z.string(),
        checked: z.boolean(),
      })
      .optional(),
  }),
});
