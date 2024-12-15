import { NextRequest, NextResponse } from "next/server";
import { get, ref, remove, update } from "firebase/database";

import { database } from "@/app/firebase/firebaseConfig";

export const GET = async (
  req: NextRequest,
  { params }: { params: { isbn13: string } }
) => {
  const { isbn13 } = params;

  try {
    const bookRef = ref(database, `/bookdata/${isbn13}`);
    const snapshot = await get(bookRef);

    if (snapshot.exists()) {
      return NextResponse.json(snapshot.val(), { status: 200 });
    } else {
      return NextResponse.json(
        { message: "책을 찾을 수 없습니다." },
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
      { message: "알 수 없는 오류가 발생했습니다.", error: "Unknown error" },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { isbn13: string } }
) => {
  const { isbn13 } = params;
  const updatedData = await req.json();

  const validData: {
    title?: string;
    priceSales?: number;
    remainAmount?: number;
    saleAmount?: number;
  } = {};

  if (updatedData.title) validData.title = updatedData.title;
  if (updatedData.priceSales) validData.priceSales = updatedData.priceSales;
  if (updatedData.remainAmount)
    validData.remainAmount = updatedData.remainAmount;
  if (updatedData.saleAmount) validData.saleAmount = updatedData.saleAmount;

  if (Object.keys(validData).length === 0) {
    return NextResponse.json(
      { message: "수정할 데이터가 없습니다." },
      { status: 400 }
    );
  }

  try {
    const bookRef = ref(database, `/bookdata/${isbn13}`);
    await update(bookRef, validData);

    return NextResponse.json(
      { message: "책 정보가 성공적으로 수정되었습니다.", book: validData },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "책 정보 수정에 실패했습니다.", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "알 수 없는 오류가 발생했습니다.", error: "Unknown error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { isbn13: string } }
) => {
  const { isbn13 } = params;

  try {
    const bookRef = ref(database, `/bookdata/${isbn13}`);
    const snapshot = await get(bookRef);

    if (snapshot.exists()) {
      await remove(bookRef);
      return NextResponse.json(
        { message: "책이 성공적으로 삭제되었습니다." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "책을 찾을 수 없습니다." },
        { status: 404 }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "책 삭제에 실패했습니다.", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "알 수 없는 오류가 발생했습니다.", error: "Unknown error" },
      { status: 500 }
    );
  }
};
