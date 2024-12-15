"use client";

import React, { useState } from "react";

import { BookDataProps } from "../../page";

interface ModifyModalProps {
  book: BookDataProps;
  onClose: () => void;
  onSave: (updatedBook: BookDataProps) => void;
}

export default function ModifyModal({
  book,
  onClose,
  onSave,
}: ModifyModalProps) {
  const [remainAmount, setRemainAmount] = useState(book.remainAmount);
  const [saleAmount, setSaleAmount] = useState(book.saleAmount);

  const handleSave = () => {
    onSave({ ...book, remainAmount, saleAmount });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-xl font-bold mb-4">책 수량 수정</h2>
        <label>잔여수량</label>
        <input
          type="number"
          value={remainAmount}
          onChange={(e) => setRemainAmount(+e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <label>판매수량</label>
        <input
          type="number"
          value={saleAmount}
          onChange={(e) => setSaleAmount(+e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-4 border border-gray-400 px-4 py-2 rounded hover:border-gray-500"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
