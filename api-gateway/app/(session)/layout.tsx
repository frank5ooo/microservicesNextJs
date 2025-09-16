"use client";
import { useEffect, useState, PropsWithChildren } from "react";
import LoginModal from "@/components/login-modal";
import { auth } from "@/actions/users-services";

export default function ACL({ children }: PropsWithChildren) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setIsValid(false);

    console.log("useEffect");

    const validate = async () => {
      try {
        const res = await auth(token);
        setIsValid(res.valid);
      } catch (err) {
        console.error("Error validando token:", err);
        setIsValid(false);
      }
    };

    validate();
  }, []);

  if (isValid === null) return null;
  if (!isValid) return <LoginModal />;

  return <>{children}</>;
}
