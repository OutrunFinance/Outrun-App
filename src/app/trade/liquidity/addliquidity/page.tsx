import AddLiquidityCard from "@/components/trade/AddLiquidityCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Liquidity | Outrun",
};

export default function AddLiquidity() {
  return (
    <div className="min-h-[70rem] bg-no-repeat bg-cover bg-[url('/images/common-bg.svg')] flex items-center justify-center pt-32">
      <AddLiquidityCard />
    </div>
  );
}
