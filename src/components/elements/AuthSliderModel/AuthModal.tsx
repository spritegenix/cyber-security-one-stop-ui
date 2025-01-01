"use client";
import React from "react";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import AuthSlider from "./AuthSlider";

export default function AuthModal({ isSignIn }: any) {
  const router = useRouter();

  const handleClose = () => {
    router.back(); // Closes the modal and goes back to the previous page
  };
  return (
    <Modal onClose={handleClose}>
      <AuthSlider isSignIn={isSignIn} handleModelClose={handleClose} />
    </Modal>
  );
}
