import SwapCard from "@/components/trade/SwapCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swap | Outrun",
};

export default function Swap() {
  return (
    <div className="min-h-[57rem] bg-no-repeat bg-cover bg-[url('/images/common-bg.svg')] flex items-center justify-center pt-32">
      <SwapCard />
    </div>
  );
}
