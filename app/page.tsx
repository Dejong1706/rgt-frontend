"use client";

import LoginPage from "./login/page";
import { useState } from "react";

export default function Home() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col items-center text-white">
        <p className="text-[2.5rem]">온라인 서점 서비스</p>
        <p className="text-[1.8rem] my-2">관리자 용</p>
      </div>
      <button
        onClick={handleLoginClick}
        className="py-2 px-6 bg-blue-500 text-white rounded-md mt-12 hover:bg-blue-600"
      >
        <p className="text-[1.5rem]">LOGIN</p>
      </button>
      {loginModalOpen && <LoginPage closeModal={handleCloseModal} />}
    </div>
  );
}
