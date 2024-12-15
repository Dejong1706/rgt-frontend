"use client";

import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginModalProps {
  closeModal: () => void;
}

export default function LoginModal({ closeModal }: LoginModalProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("adminLogin", "true");
      router.push("/booklist");
    } catch (error) {
      setError("이메일 혹은 비밀번호를 확인해주세요.");
      console.log("로그인 실패", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[60%] h-[60%] p-8 rounded-lg shadow-lg flex flex-col justify-center relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-3 text-black"
        >
          <p className="text-[1.5rem]">X</p>
        </button>
        <h1 className="text-[2.2rem] font-bold text-center mb-6">LOGIN</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 w-[60%] mx-auto"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-[1.1rem] font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-[1.1rem] font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-6 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            로그인
          </button>
          {error && <p className="text-red-500 mt-4 mx-auto">{error}</p>}
        </form>
      </div>
    </div>
  );
}
