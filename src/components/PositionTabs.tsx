"use client";
import { execute, RethPositionDocument, RusdPositionDocument, type StakeORETH, type StakeORUSD } from "@/subgraph";
import { Tab, Tabs } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import PositionTab from "./PositionTab";

export default function PositionTabs() {
  const account = useAccount();

  const { data: rethPositions } = useQuery({
    queryKey: ["orethPositions", account.address],
    queryFn: async (): Promise<StakeORETH[]> => {
      return execute(RethPositionDocument, { account: account.address }).then(
        (res: { data: { stakeORETHs: StakeORETH[] } }) => res.data.stakeORETHs,
      );
    },
  });

  const { data: rusdPositions } = useQuery({
    queryKey: ["orusdPositions", account.address],
    queryFn: async (): Promise<StakeORUSD[]> => {
      return execute(RusdPositionDocument, { account: account.address }).then(
        (res: { data: { stakeORUSDs: StakeORETH[] } }) => res.data.stakeORUSDs,
      );
    },
  });

  return (
    <Tabs
      variant="underlined"
      aria-label="Position Tabs"
      classNames={{
        tab: "h-12 data-[hover-unselected=true]:opacity-100",
        cursor: "w-[50%] bg-[#EC19FF]",
        tabContent: "text-white text-[1.5rem] leading-[2.13rem] group-data-[selected=true]:text-white",
        panel: "mt-12 pb-24",
      }}>
      <Tab key="ETH" title="ETH Position">
        <PositionTab ethPositions={rethPositions} type="ETH" />
      </Tab>
      <Tab key="USDB" title="USDB Position">
        <PositionTab usdbPositions={rusdPositions} type="USDB" />
      </Tab>
    </Tabs>
  );
}
