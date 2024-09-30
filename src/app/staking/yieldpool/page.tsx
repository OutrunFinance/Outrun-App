import YieldPoolCard from "@/components/YieldPoolCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yield Pool | Outrun",
};

export default function YieldPool() {
  return (
    <div className="min-h-[57rem] bg-no-repeat bg-cover bg-[url('/images/common-bg.svg')] flex items-center justify-center pt-32">
      <YieldPoolCard />
    </div>
  );
}
