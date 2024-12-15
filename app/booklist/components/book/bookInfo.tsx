"use client";

import { BookDataProps } from "../../page";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BookInfoProps {
  book: BookDataProps;
  handleModifyClick: (book: BookDataProps) => void;
  handleDeleteClick: (isbn13: string) => void;
}

export default function BookInfo({
  book,
  handleModifyClick,
  handleDeleteClick,
}: BookInfoProps) {
  return (
    <li key={book.isbn13} className="my-8 flex justify-center">
      <div className="w-[30%] flex justify-center">
        <div className="relative w-[15rem]">
          <Image src={book.cover} width={180} height={100} alt="book" />
        </div>
      </div>
      <div className="w-[45%] flex flex-col justify-center">
        <Link href={`/Other/book/${book.isbn13}`}>
          <p className="font-bold text-[1.1rem]">{book.title}</p>
          <p className="my-2 text-[1rem]">{book.author}</p>
          <p className="my-2 font-semibold text-[0.9rem]">
            <span className="text-[#0D92F4]">가격 : </span>
            {`${book.priceStandard.toLocaleString()}원`}
          </p>
          <p className="font-Score">{book.description}</p>
          <div className="flex mt-4 text-[1.1rem]">
            <p className="mr-8">{`재고수량 : ${book.remainAmount} 개`}</p>
            <p>{`판매수량 : ${book.saleAmount} 개`}</p>
          </div>
        </Link>
      </div>
      <div className="w-[20%] flex justify-center items-center">
        <div className="w-[60%] h-[60%] flex flex-col justify-around items-center text-white font-bold">
          <button
            className="bg-blue-800 w-24 h-12 rounded-lg"
            onClick={() => handleModifyClick(book)}
          >
            수정
          </button>
          <button
            className="bg-gray-800 w-24 h-12 rounded-lg"
            onClick={() => handleDeleteClick(book.isbn13)}
          >
            삭제
          </button>
        </div>
      </div>
    </li>
  );
}
