import PositionTabs from "@/components/PositionTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Position | Outrun",
};

export default function Position() {
  return (
    <div className="min-h-[57rem] bg-[url('/images/position-bg.png')] bg-no-repeat bg-cover pt-[16.5rem] px-[14rem]">
      <PositionTabs />
    </div>
  );
}
