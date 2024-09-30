"use client";
import { Button, Link, Tab, Tabs } from "@nextui-org/react";
import LiquidityTab from "./LiquidityTab";

export default function LiquidityContent() {
  return (
    <div>
      <div className="w-[82.47rem] h-[35.10rem] bg-no-repeat bg-cover bg-[url('/images/liquidity-header.png')] flex flex-col items-center gap-y-24 pt-[6.06rem]">
        {/* <Image alt="title" src="/images/liquidity-title.svg" className="w-[68.19rem] h-[4.75rem]" /> */}
        <span className="bg-title-card bg-clip-text text-transparent font-verdana font-bold text-[4.06rem] leading-[5.69rem]">
          EARN WITH YOUR LIQUIDITY
        </span>
        <div className="flex justify-center items-center gap-[13rem] w-full text-white font-avenir">
          <div className="flex flex-col gap-y-4">
            <span className="text-[1.88rem] leading-[2.63rem] font-medium">VOLUME(24H): </span>
            <span className="text-[3.13rem] leading-[4.38rem] font-extrabold">$40.23M</span>
          </div>
          <div className="flex flex-col gap-y-4">
            <span className="text-[1.88rem] leading-[2.63rem] font-medium">TVL: </span>
            <span className="text-[3.13rem] leading-[4.38rem] font-extrabold">$40.23M</span>
          </div>
        </div>
      </div>
      <div className="mt-[2.94rem] w-full relative">
        <Button
          href="/trade/liquidity/addliquidity"
          as={Link}
          className="absolute right-0 top-3 rounded-[5.63rem] bg-transparent text-white text-[1.13rem] leading-[1.56rem] font-medium w-[10.75rem] h-[2.63rem] border-solid border-[0.06rem] border-white"
          startContent={<span className="text-[1.13rem] font-medium">+</span>}>
          Creat Position
        </Button>
        <Tabs
          variant="underlined"
          aria-label="Liquidity Tabs"
          classNames={{
            tab: "h-12 data-[hover-unselected=true]:opacity-100 ",
            cursor: "w-[50%] bg-[#EC19FF]",
            tabContent: "text-white text-[1.5rem] leading-[2.13rem] group-data-[selected=true]:text-white",
            panel: "mt-8 pb-24",
          }}>
          <Tab key="allPool" title="All Pool">
            <LiquidityTab />
          </Tab>
          <Tab key="myPositions" title="My Positions"></Tab>
        </Tabs>
      </div>
    </div>
  );
}
