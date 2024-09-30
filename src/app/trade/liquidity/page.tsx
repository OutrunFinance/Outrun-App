import LiquidityContent from "@/components/trade/LiquidityContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liquidity | Outrun",
};

export default function Liquidity() {
  return (
    <div className="h-[125rem] relative bg-[#0B0C1D]">
      <img alt="background" src="/images/common-bg.svg" className="absolute top-0 left-0 bg-no-repeat z-0" />
      <div className="absolute z-10 top-[14rem] left-[16rem]">
        <LiquidityContent />
      </div>
    </div>
  );
}
