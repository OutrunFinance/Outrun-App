import type { StakeORETH, StakeORUSD } from "@/subgraph";
import { useEffect, useState } from "react";
import PaginationCustom from "./PaginationCustom";
import PositionETHCard from "./PositionETHCard";

export default function PositionTab({
  ethPositions,
  usdbPositions,
  type = "ETH",
}: {
  ethPositions?: StakeORETH[];
  usdbPositions?: StakeORUSD[];
  type: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 6;

  useEffect(() => {
    if (!ethPositions) {
      setTotal(usdbPositions?.length as number);
    } else {
      setTotal(ethPositions?.length as number);
    }
  }, [ethPositions, usdbPositions]);

  return (
    <div className="flex flex-col items-center gap-[4.5rem]">
      <div className="flex gap-[1.75rem] flex-wrap w-full">
        {type === "ETH"
          ? ethPositions
              ?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
              ?.map((item) => (
                <PositionETHCard
                  type={type}
                  key={item.positionId}
                  positionId={item?.positionId}
                  amountInOR={item?.amountInORETH}
                  amountInOS={item?.amountInOSETH}
                  YT={item?.amountInREY}
                  deadline={item.deadline}
                />
              ))
          : usdbPositions
              ?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
              ?.map((item) => (
                <PositionETHCard
                  type={type}
                  key={item.positionId}
                  positionId={item.positionId}
                  amountInOR={item?.amountInORUSD}
                  amountInOS={item?.amountInOSUSD}
                  YT={item?.amountInRUY}
                  deadline={item.deadline}
                />
              ))}
      </div>
      {total > 6 ? (
        <PaginationCustom total={total} currentPage={currentPage} pageSize={6} setCurrentPage={setCurrentPage} />
      ) : null}
    </div>
  );
}
