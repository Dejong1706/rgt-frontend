import React, { useState } from "react";

import { BookDataProps } from "../../page";
import axios from "axios";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBookModal({ isOpen, onClose }: AddBookModalProps) {
  const [newBook, setNewBook] = useState<BookDataProps>({
    author: "",
    description: "",
    categoryId: "",
    categoryName: "",
    itemId: 0,
    link: "",
    isbn13: "",
    title: "",
    cover: "",
    priceSales: 0,
    priceStandard: 0,
    pubDate: "",
    publisher: "",
    remainAmount: 0,
    saleAmount: 0,
  });

  const handleAddBook = async () => {
    if (
      newBook.title === "" ||
      newBook.author === "" ||
      newBook.priceStandard === 0 ||
      newBook.remainAmount === 0 ||
      newBook.saleAmount === 0 ||
      newBook.categoryName === "" ||
      newBook.pubDate === "" ||
      newBook.publisher === ""
    ) {
      alert("빈 칸을 입력해주세요");
      return;
    }

    try {
      const response = await axios.post("/api/books", newBook, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        onClose();
        alert("책이 추가되었습니다.");
        setNewBook({
          author: "",
          description: "",
          categoryId: "",
          categoryName: "",
          itemId: 0,
          link: "",
          isbn13: "",
          title: "",
          cover: "",
          priceSales: 0,
          priceStandard: 0,
          pubDate: "",
          publisher: "",
          remainAmount: 0,
          saleAmount: 0,
        });
        window.location.reload();
      } else {
        throw new Error("책 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("책 추가 에러:", error);
    }
  };

  return isOpen ? (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">책 추가</h2>
        <div>
          <input
            type="text"
            value={newBook.cover}
            onChange={(e) => setNewBook({ ...newBook, cover: e.target.value })}
            placeholder="이미지링크"
            className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            placeholder="제목"
            className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            placeholder="저자"
            className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            value={newBook.isbn13}
            onChange={(e) => setNewBook({ ...newBook, isbn13: e.target.value })}
            placeholder="isbn13"
            className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            value={newBook.priceStandard || ""}
            onChange={(e) =>
              setNewBook({ ...newBook, priceStandard: +e.target.value })
            }
            placeholder="가격"
            className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            value={newBook.description}
            onChange={(e) =>
              setNewBook({ ...newBook, description: e.target.value })
            }
            placeholder="설명"
            className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            value={newBook.remainAmount || ""}
            onChange={(e) =>
              setNewBook({ ...newBook, remainAmount: +e.target.value })
            }
            placeholder="재고수량"
            className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            value={newBook.saleAmount || ""}
            onChange={(e) =>
              setNewBook({ ...newBook, saleAmount: +e.target.value })
            }
            placeholder="판매수량"
            className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            value={newBook.categoryName}
            onChange={(e) =>
              setNewBook({ ...newBook, categoryName: e.target.value })
            }
            placeholder="categoryName"
            className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            value={newBook.pubDate}
            onChange={(e) =>
              setNewBook({ ...newBook, pubDate: e.target.value })
            }
            placeholder="출판일"
            className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            value={newBook.publisher}
            onChange={(e) =>
              setNewBook({ ...newBook, publisher: e.target.value })
            }
            placeholder="출판사"
            className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          />
          <div className="flex justify-around">
            <button
              onClick={handleAddBook}
              className="bg-sky-500 text-white px-4 py-2 rounded-lg"
            >
              추가
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
