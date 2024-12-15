"use client";

import React, { useEffect, useState } from "react";

import AddBookModal from "./components/add/addBookModal";
import BookInfo from "./components/book/bookInfo";
import Loading from "./components/loading/loading";
import ModifyModal from "./components/modify/modifyModal";
import SearchBar from "./components/search/searchBar";
import axios from "axios";
import { useDebounce } from "./hooks/useDebouce";
import { useRouter } from "next/navigation";

export interface BookDataProps {
  author: string;
  description: string;
  categoryId: string;
  categoryName: string;
  itemId: number;
  link: string;
  isbn13: string;
  title: string;
  cover: string;
  priceSales: number;
  priceStandard: number;
  pubDate: string;
  publisher: string;
  remainAmount: number;
  saleAmount: number;
}

export default function BookList() {
  const [bookData, setBookData] = useState<BookDataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const debounceSearchValue = useDebounce(searchValue);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookDataProps | null>(null);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const router = useRouter();

  const booksPerPage = 10;

  useEffect(() => {
    const adminLogin = localStorage.getItem("adminLogin");

    if (!adminLogin) {
      alert("로그인이 필요합니다.");
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/books");
        setBookData(Object.values(response.data));
      } catch (error) {
        console.log("에러가 발생했습니다", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminLogin");
    alert("로그아웃되었습니다.");
    router.push("/");
  };

  const handleModifyClick = (book: BookDataProps) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleModifyModalClose = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  const handleModifySave = async (updatedBook: BookDataProps) => {
    try {
      const response = await axios.put(
        `/api/books/${updatedBook.isbn13}`,
        updatedBook,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setBookData((prev) =>
          prev.map((book) =>
            book.isbn13 === updatedBook.isbn13 ? updatedBook : book
          )
        );
        handleModifyModalClose();
      } else {
        throw new Error("책 데이터를 수정하는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("수정 에러:", error);
    }
  };

  const handleDeleteClick = async (isbn13: string) => {
    try {
      const response = await axios.delete(`/api/books/${isbn13}`);
      if (response.status === 200) {
        setBookData((prev) => prev.filter((book) => book.isbn13 !== isbn13));
      } else {
        throw new Error("책 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const filteredBooks = bookData.filter((book) => {
    if (book && book.title && book.author) {
      return (
        book.title.includes(debounceSearchValue) ||
        book.author.includes(debounceSearchValue)
      );
    }
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <div className="bg-blue-950 text-white h-12 flex items-center justify-between">
        <h1 className="text-[1.3rem] font-bold pl-8">책 리스트</h1>
        <button className="pr-8" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
      <div className="flex justify-end mr-8">
        <button
          onClick={() => setIsAddBookModalOpen(true)}
          className="border border-black px-4 py-2 rounded-lg mt-4"
        >
          새 책
        </button>
      </div>
      <div className="flex justify-center items-center mt-6">
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <ul>
        {currentBooks.length === 0 ? (
          <li className="w-full h-[200px] text-[2rem] flex justify-center items-center">
            <p>일치하는 검색 결과가 없습니다.</p>
          </li>
        ) : (
          currentBooks.map((book) => (
            <BookInfo
              key={book.isbn13}
              book={book}
              handleModifyClick={handleModifyClick}
              handleDeleteClick={handleDeleteClick}
            />
          ))
        )}
      </ul>

      <div className="flex justify-center my-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-2 ${
              currentPage === index + 1
                ? "bg-blue-800 text-white"
                : "bg-gray-200"
            } rounded-lg`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <AddBookModal
        isOpen={isAddBookModalOpen}
        onClose={() => setIsAddBookModalOpen(false)}
      />

      {isModalOpen && selectedBook && (
        <ModifyModal
          book={selectedBook}
          onClose={handleModifyModalClose}
          onSave={handleModifySave}
        />
      )}
    </div>
  );
}
