"use client";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";

const ReturnPage = () => {
  useEffect(() => {
    signOut();
  }, []);

  return <>Loading...</>;
};

export default ReturnPage;
