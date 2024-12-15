import { NextRequest, NextResponse } from "next/server";
import { get, ref, set } from "firebase/database";

import { database } from "@/app/firebase/firebaseConfig";

export const GET = async () => {
  try {
    const booksRef = ref(database, "/bookdata");
    const snapshot = await get(booksRef);

    if (snapshot.exists()) {
      return NextResponse.json(snapshot.val(), { status: 200 });
    } else {
      return NextResponse.json(
        { message: "데이터가 존재하지 않음" },
        { status: 404 }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "데이터를 불러오는 데 실패했습니다.", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "알 수 없는 오류 발생.", error: "Unknown error" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  const newBookData = await req.json();
  const {
    isbn13,
    title,
    author,
    categoryId,
    categoryName,
    cover,
    description,
    priceSales,
    priceStandard,
    pubDate,
    publisher,
    remainAmount,
    saleAmount,
    link,
  } = newBookData;

  try {
    const bookRef = ref(database, `/bookdata/${isbn13}`);

    const snapshot = await get(bookRef);
    if (snapshot.exists()) {
      return NextResponse.json(
        { message: "이 책은 이미 존재합니다." },
        { status: 400 }
      );
    }

    await set(bookRef, {
      isbn13,
      title,
      author,
      categoryId,
      categoryName,
      cover,
      description,
      priceSales,
      priceStandard,
      pubDate,
      publisher,
      remainAmount,
      saleAmount,
      link,
    });

    return NextResponse.json(
      { message: "책이 성공적으로 추가되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "책을 추가하는데 실패.", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "알 수 없는 오류 발생.", error: "Unknown error" },
      { status: 500 }
    );
  }
};
