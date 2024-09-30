import LiquidStakingCard from "@/components/LiquidStakingCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liquid Staking | Outrun",
};

export default function LiquidStaking() {
  return (
    <div className="min-h-[57rem] bg-no-repeat bg-cover bg-[url('/images/common-bg.svg')] relative flex pt-64 justify-center">
      <div className="top-[18.47rem]">
        <LiquidStakingCard />
      </div>
    </div>
  );
}
