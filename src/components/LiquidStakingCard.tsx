"use client";
import { Tab, Tabs } from "@nextui-org/react";
import MintTab from "./MintTab";
import StakeTab from "./StakeTab";

export default function LiquidStakingCard() {
  return (
    <div className="w-[38.44rem] min-h-[31.56rem] shadow-card bg-modal border-[0.06rem] rounded-[1.25rem] border-card">
      <Tabs
        aria-label="Yield Pool Tabs"
        classNames={{
          base: "w-full h-[4rem]",
          tab: "h-full data-[hover-unselected=true]:opacity-100 bg-transparent font-kronaOne",
          tabList: "h-full flex gap-x-8 rounded-none pl-8 pt-8 bg-transparent",
          tabContent:
            "text-white group-data-[selected=true]:bg-title text-[1.5rem] leading-[1.88rem] font-kronaOne group-data-[selected=true]:text-transparent group-data-[selected=true]:bg-clip-text",
          cursor: "bg-transparent",
          panel: "mt-[0.5rem] py-8",
        }}>
        <Tab key="mint" title="Mint">
          <MintTab />
        </Tab>
        <Tab key="stake" title="Stake">
          <StakeTab />
        </Tab>
      </Tabs>
    </div>
  );
}
