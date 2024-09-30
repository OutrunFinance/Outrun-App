"use client";
import { Button, Image, Pagination } from "@nextui-org/react";

export default function PaginationCustom({
  total,
  currentPage,
  pageSize,
  setCurrentPage,
}: {
  total: number;
  currentPage: number;
  pageSize: number;
  setCurrentPage: (page: number) => void;
}) {
  return (
    <div className="flex gap-2 items-center">
      <Button
        isIconOnly
        className="bg-transparent"
        isDisabled={currentPage === 1}
        onPress={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}>
        <Image alt="arrow left" src="/images/arrow-right.svg" className="rotate-180" />
      </Button>
      <Pagination
        disableCursorAnimation
        total={Math.ceil(total / pageSize)}
        variant="light"
        page={currentPage}
        onChange={setCurrentPage}
        classNames={{
          item: "text-white text-[0.88rem] [&[data-hover=true]:not([data-active=true])]:bg-transparent data-[active=true]:text-[#EC19FF] data-[active=true]:bg-transparent",
          prev: "text-white [&[data-hover=true]:not([data-active=true])]:bg-transparent active:bg-transparent active:text-[#EC19FF]",
          next: "text-white [&[data-hover=true]:not([data-active=true])]:bg-transparent active:bg-transparent active:text-[#EC19FF]",
        }}
      />
      <Button
        isIconOnly
        className="bg-transparent"
        isDisabled={currentPage === total}
        onPress={() => setCurrentPage(currentPage < total ? currentPage + 1 : currentPage)}>
        <Image alt="arrow right" src="/images/arrow-right.svg" />
      </Button>
    </div>
  );
}
