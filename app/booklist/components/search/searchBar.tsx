import { FiSearch } from "react-icons/fi";
import React from "react";

interface SearchBarProps {
  searchValue: string;
  setSearchValue: (term: string) => void;
}

export default function SearchBar({
  searchValue,
  setSearchValue,
}: SearchBarProps) {
  return (
    <div className="relative w-[40rem]">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <FiSearch className="text-black" />
      </div>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="제목 혹은 작가명을 입력하세요"
        className="w-full pl-12 pr-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
    </div>
  );
}
