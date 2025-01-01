import { FcGoogle } from "react-icons/fc";
import Button from "../Button";

export function GoogleAuthButton() {
  return (
    <Button variant="white" leftIcon={<FcGoogle className="text-2xl" />}>
      Sign In with Google
    </Button>
  );
}
