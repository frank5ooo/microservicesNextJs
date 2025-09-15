"use client";
import { useEffect, useState, PropsWithChildren } from "react";
import LoginModal from "@/components/login-modal";
import axios from "axios";

export default function ACL({ children }: PropsWithChildren) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setIsValid(false);

    axios
      .post("http://localhost:3000/api/auth", { token })
      .then((res) => setIsValid(res.data.valid));
  }, []);

  if (!isValid) return <LoginModal />;

  return <>{children}</>;
}