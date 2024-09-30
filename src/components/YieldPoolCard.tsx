"use client";
import { BlockExplorers } from "@/contracts/chains";
import { getOrethStake, getOrUsdStake } from "@/contracts/getTokenContract";
import { REY, RUY } from "@/contracts/tokens";
import useContract from "@/hooks/useContract";
import { Link, Tab, Tabs } from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Decimal from "decimal.js-light";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useChainId, usePublicClient, useWalletClient } from "wagmi";
import ToastCustom from "./ToastCustom";
import YieldPoolTab from "./YieldPoolTab";

export default function YieldPoolCard() {
  const account = useAccount();

  const chainId = useChainId();
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { write: writeContract } = useContract();
  const [withdrawReyAmount, setWithdrawReyAmount] = useState("");
  const [withdrawRuyAmount, setWithdrawRuyAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const blockExplore = useMemo(() => {
    return BlockExplorers[chainId];
  }, [chainId]);

  // ETH
  const { data: avgStakeDaysOreth } = useQuery({
    queryKey: ["avgStakeDaysOreth", chainId],
    queryFn: async (): Promise<number> => {
      if (!publicClient) return 0;
      const result = (await getOrethStake(chainId, publicClient).read["avgStakeDays"]()) as bigint;
      return Number(result.toString());
    },
  });
  const { data: unclaimedYieldingOreth } = useQuery({
    queryKey: ["unclaimedYieldingOreth", chainId],
    queryFn: async (): Promise<string> => {
      if (!publicClient) return "0";
      const result = (await getOrethStake(chainId, publicClient).read["totalYieldPool"]()) as bigint;
      return formatUnits(result, 18);
    },
  });

  const { data: apyOreth } = useQuery({
    queryKey: ["apyOreth", chainId, unclaimedYieldingOreth],
    queryFn: async (): Promise<string> => {
      if (!publicClient) return "0";
      const supply = await REY[chainId].totalSupply(publicClient);
      return new Decimal(unclaimedYieldingOreth || "0").div(supply).mul(100).toDecimalPlaces(2).toString();
    },
  });

  const { data: reyBalance } = useQuery({
    queryKey: ["reyBalance", chainId, account.address],
    queryFn: async (): Promise<string> => {
      if (!publicClient || !account.address) return "0";
      const balance = await REY[chainId].balanceOf(account.address, publicClient);
      return balance.toString();
    },
  });

  // USDB
  const { data: avgStakeDaysOrusd } = useQuery({
    queryKey: ["avgStakeDaysOrusd", chainId],
    queryFn: async (): Promise<number> => {
      if (!publicClient) return 0;
      const result = (await getOrUsdStake(chainId, publicClient).read["avgStakeDays"]()) as bigint;
      return Number(result.toString());
    },
  });
  const { data: unclaimedYieldingOrusd } = useQuery({
    queryKey: ["unclaimedYieldingOrusd", chainId],
    queryFn: async (): Promise<string> => {
      if (!publicClient) return "0";
      const result = (await getOrUsdStake(chainId, publicClient).read["totalYieldPool"]()) as bigint;
      return formatUnits(result, 18);
    },
  });

  const { data: apyOrusd } = useQuery({
    queryKey: ["apyOrusd", chainId, unclaimedYieldingOrusd],
    queryFn: async (): Promise<string> => {
      if (!publicClient) return "0";
      const supply = await RUY[chainId].totalSupply(publicClient);
      return new Decimal(unclaimedYieldingOrusd || "0").div(supply).mul(100).toDecimalPlaces(2).toString();
    },
  });

  const { data: ruyBalance } = useQuery({
    queryKey: ["ruyBalance", chainId, account.address],
    queryFn: async (): Promise<string> => {
      if (!publicClient || !account.address) return "0";
      const balance = await RUY[chainId].balanceOf(account.address, publicClient);
      return balance.toString();
    },
  });

  async function withdrawHandler(type: string) {
    setLoading(true);
    let data;
    if (type === "rey") {
      if (!reyBalance || !withdrawReyAmount) return;
      if (reyBalance < withdrawReyAmount) return toast.custom(() => <ToastCustom content={<>token insufficient</>} />);
      data = await writeContract(
        // @ts-ignore
        getOrethStake(chainId, publicClient!, walletClient),
        {
          actionTitle: "withdrawYield",
        },
        "withdrawYield",
        [parseUnits(withdrawReyAmount, 18)],
        {
          account,
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["reyBalance"],
      });
    } else {
      if (!ruyBalance || !withdrawRuyAmount) return;
      if (ruyBalance < withdrawRuyAmount) return toast.custom(() => <ToastCustom content={<>token insufficient</>} />);
      data = await writeContract(
        // @ts-ignore
        getOrethStake(chainId, publicClient!, walletClient),
        {
          actionTitle: "withdrawYield",
        },
        "withdrawYield",
        [parseUnits(withdrawRuyAmount, 18)],
        {
          account,
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["ruyBalance"],
      });
    }
    if (data && data.status === "success") {
      toast.custom(() => (
        <ToastCustom
          content={
            <>
              {`You have successfully burned ${type === "rey" ? withdrawReyAmount : withdrawRuyAmount} ${
                type === "rey" ? "REY" : "RUY"
              }`}
              . view on
              <Link href={blockExplore + "/tx/" + data.transactionHash}>BlastScan</Link>
            </>
          }
        />
      ));
    }
    setLoading(false);
  }

  return (
    <div className="w-[38.44rem] h-[31.56rem] shadow-card bg-modal border-[0.06rem] rounded-[1.25rem] border-card">
      <Tabs
        aria-label="Yield Pool Tabs"
        classNames={{
          base: "w-full h-[4rem]",
          tab: "h-full data-[hover-unselected=true]:opacity-100 bg-transparent font-kronaOne",
          tabList:
            "w-full h-full flex justify-between rounded-none p-0 border-b border-divider border-[0.06rem] border-solid border-[#4A325D] border-opacity-30 bg-transparent",
          tabContent:
            "text-white group-data-[selected=true]:bg-title text-[1.25rem] leading-[1.56rem] font-kronaOne group-data-[selected=true]:text-transparent group-data-[selected=true]:bg-clip-text",
          cursor: "bg-transparent",
          panel: "mt-[1.75rem] py-0",
        }}>
        <Tab key="ETH" title="ETH Yield Pool">
          <YieldPoolTab
            type="REY"
            avgStakeDays={avgStakeDaysOreth}
            unclaimedYielding={unclaimedYieldingOreth}
            apr={apyOreth}
            balance={reyBalance}
            amount={withdrawReyAmount}
            setAmount={setWithdrawReyAmount}
            loading={loading}
            burn={() => {
              withdrawHandler("rey");
            }}
          />
        </Tab>
        <Tab key="USDB" title="USDB Yield Pool">
          <YieldPoolTab
            type="RUY"
            avgStakeDays={avgStakeDaysOrusd}
            unclaimedYielding={unclaimedYieldingOrusd}
            apr={apyOrusd}
            balance={ruyBalance}
            amount={withdrawRuyAmount}
            setAmount={setWithdrawRuyAmount}
            loading={loading}
            burn={() => {
              withdrawHandler("ruy");
            }}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
