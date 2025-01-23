import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/elements/Input";
import Button from "@/components/elements/Button";

// Define the Zod schema
const formSchema = z.object({
  pincode: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

// Infer the form's TypeScript type from the schema
type FormValues = z.infer<typeof formSchema>;

const AddressForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="rounded bg-white p-4 shadow">
      <h1 className="mb-4 text-xl font-semibold">Address Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 gap-1">
        <div className="mb-4">
          <Input
            type="text"
            placeHolder=" "
            id="pincode"
            label="Pincode"
            {...register("pincode")}
          />
          {errors.pincode && <p className="text-sm text-red-500">{errors.pincode.message}</p>}
        </div>

        <div className="mb-4">
          <Input type="text" placeHolder=" " id="city" label="City" {...register("city")} />
          {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
        </div>

        <div className="mb-4">
          <Input type="text" placeholder=" " id="state" label="State" {...register("state")} />
          {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
        </div>

        <div className="mb-4">
          <Input
            type="text"
            placeholder=" "
            label="Country"
            id="country"
            {...register("country")}
          />
          {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddressForm;
