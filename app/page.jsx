"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">You are logged in!</h1>
      <button
        onClick={handleNavigate}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Page;
