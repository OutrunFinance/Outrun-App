import { Button, Image } from "@nextui-org/react";
import dayjs from "dayjs";
import { useState } from "react";
import { formatUnits } from "viem";
import ExtendStakingDaysModal from "./ExtendStakingDaysModal";
import UnstakeModal from "./UnstakeModal";

export default function PositionETHCard({
  positionId,
  amountInOR,
  amountInOS,
  YT,
  deadline,
  type = "ETH",
}: {
  positionId: bigint;
  amountInOR: bigint;
  amountInOS: bigint;
  YT: bigint;
  deadline: number;
  type: string;
}) {
  const [pulldown, setPulldown] = useState(false);

  return (
    <div
      className={
        pulldown
          ? "w-[26.38rem] h-[22.63rem] text-white font-avenir relative border-solid border-[#504360] border-[0.03rem] rounded-[1.25rem] overflow-hidden bg-no-repeat bg-cover bg-[url('/images/position-card-bg.svg')]"
          : "w-[26.38rem] h-[20.63rem] text-white font-avenir relative border-solid border-[#504360] border-[0.03rem] rounded-[1.25rem] overflow-hidden bg-no-repeat bg-cover bg-[url('/images/position-card-bg.svg')]"
      }>
      <div className="opacity-50 absolute top-[0.56rem] right-[1.13rem] text-[1.25rem] leading-7">#{positionId}</div>
      <div className="absolute top-[3.56rem] left-[2.13rem] flex flex-wrap gap-x-[6rem] gap-y-[3rem]">
        <div className="flex flex-col gap-5">
          <span className="text-[1rem] leading-[1.38rem] opacity-80">Staked {type === "ETH" ? "orETH" : "orUSD"}</span>
          <span className="text-[1.13rem] leading-[1.56rem] font-extrabold">{formatUnits(amountInOR, 18)}</span>
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-[1rem] leading-[1.38rem] opacity-80">
            Generated {type === "ETH" ? "osETH" : "osUSD"}
          </span>
          <span className="text-[1.13rem] leading-[1.56rem] font-extrabold">{formatUnits(amountInOS, 18)}</span>
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-[1rem] leading-[1.38rem] opacity-80">Generated YT</span>
          <span className="text-[1.13rem] leading-[1.56rem] font-extrabold">{formatUnits(YT, 18)}</span>
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-[1rem] leading-[1.38rem] opacity-80">Unlock Time</span>
          <span className="text-[1.13rem] leading-[1.56rem] font-extrabold">
            {dayjs(deadline * 1000).format("YYYY/MM/DD HH:mm")}
          </span>
        </div>
        {pulldown ? (
          <div className="flex gap-x-[6rem]">
            <ExtendStakingDaysModal deadline={deadline} type={type} positionId={positionId} orAmount={amountInOR} />
            <UnstakeModal
              deadline={deadline}
              positionId={positionId}
              type={type}
              osAmount={amountInOS}
              orAmount={amountInOR}
            />
          </div>
        ) : (
          <Button
            isIconOnly
            className="bg-transparent absolute bottom-[-5rem] left-[40.5%]"
            onPress={() => setPulldown(true)}>
            <Image alt="arrow down" src="/images/arrow_down.svg" />
          </Button>
        )}
      </div>
    </div>
  );
}
