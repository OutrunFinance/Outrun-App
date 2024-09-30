import { addressMap } from "@/contracts/addressMap";
import { BlockExplorers } from "@/contracts/chains";
import { currencyStakePageSelectList, currencyStakePageSelectList2 } from "@/contracts/currencys";
import { getOrethStake, getOrUsdStake } from "@/contracts/getTokenContract";
import { ORETH, ORUSD, OSETH, OSUSD } from "@/contracts/tokens";
import useContract from "@/hooks/useContract";
import { BtnAction, SwapView, useSwap } from "@/hooks/useSwap";
import type { Currency } from "@/packages/core";
import { Button, Divider, Input, Link, Slider } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Decimal from "decimal.js-light";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useChainId, usePublicClient, useWalletClient } from "wagmi";
import ToastCustom from "./ToastCustom";
import TokenSelect from "./TokenSelect";

export default function StakeTab() {
  const chainId = useChainId();
  const account = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [sliderValue, setSliderValue] = useState(365);

  const { write: writeContract } = useContract();
  const {
    swapData,
    loading,
    setToken0,
    setToken1,
    setLoading,
    approveTokens,
    token0AmountInputHandler,
    token1AmountInputHandler,
    updateTokenBalance,
    maxHandler,
  } = useSwap({
    view: SwapView.mint,
    approve2Tokens: false,
  });
  const blockExplore = useMemo(() => {
    return BlockExplorers[chainId];
  }, [chainId]);
  const title = useMemo(() => {
    if (!swapData.token0) return "Choose Token";
    if (swapData.token0.equals(ORETH[chainId])) {
      return "Stake orETH";
    } else if (swapData.token0.equals(ORUSD[chainId])) {
      return "Stake orUSD";
    }
  }, [swapData.token0, chainId]);

  const yieldAmount = useMemo(() => {
    if (!sliderValue || !swapData.token0AmountInput) return 0;
    return new Decimal(sliderValue).mul(swapData.token0AmountInput).toString();
  }, [sliderValue, swapData.token0AmountInput]);

  const yieldTokenSymbol = useMemo(() => {
    if (swapData.token0?.equals(ORETH[chainId])) return "REY";
    if (swapData.token0?.equals(ORUSD[chainId])) return "RUY";
    return "";
  }, [swapData.token0]);

  const { data: exchangeRate } = useQuery({
    queryKey: ["calc-stake-exchangerate", swapData.token0, publicClient?.chain.id],
    queryFn: async () => {
      if (!publicClient) return 0;
      if (swapData.token0?.equals(ORETH[chainId])) {
        let result = await getOrethStake(chainId, publicClient).read["calcOSETHAmount"]([parseUnits("1", 18)]);
        return formatUnits(result as bigint, 18);
      }
      if (swapData.token0?.equals(ORUSD[chainId])) {
        let result = await getOrUsdStake(chainId, publicClient).read["calcOSUSDAmount"]([parseUnits("1", 18)]);
        return formatUnits(result as bigint, 18);
      }
      return 0;
    },
  });

  const { data: minLockedDays } = useQuery({
    queryKey: ["stake-minLockedDays", swapData.token0, publicClient?.chain.id],
    queryFn: async () => {
      if (!publicClient) return 0;
      if (swapData.token0?.equals(ORETH[chainId])) {
        let result = await getOrethStake(chainId, publicClient).read["minLockupDays"]();
        return Number(result.toString());
      }
      if (swapData.token0?.equals(ORUSD[chainId])) {
        let result = await getOrUsdStake(chainId, publicClient).read["minLockupDays"]();
        return Number(result.toString());
      }
      return 0;
    },
  });

  const { data: maxLockedDays } = useQuery({
    queryKey: ["stake-maxLockedDays", swapData.token0, publicClient?.chain.id],
    queryFn: async () => {
      if (!publicClient) return 0;
      if (swapData.token0?.equals(ORETH[chainId])) {
        let result = await getOrethStake(chainId, publicClient).read["maxLockupDays"]();
        return Number(result.toString());
      }
      if (swapData.token0?.equals(ORUSD[chainId])) {
        let result = await getOrUsdStake(chainId, publicClient).read["maxLockupDays"]();
        return Number(result.toString());
      }
      return 0;
    },
  });

  useEffect(() => {
    setToken0(ORETH[chainId]);
    setToken1(OSETH[chainId]);
  }, [chainId]);

  useEffect(() => {
    let output = "";
    if (!swapData.token0AmountInput || isNaN(+swapData.token0AmountInput)) {
      output = "";
    } else if (exchangeRate) {
      output = new Decimal(swapData.token0AmountInput).mul(exchangeRate).toString();
    }
    token1AmountInputHandler(output);
  }, [swapData.token0AmountInput, exchangeRate]);

  function onSelectToken0(token: Currency) {
    setToken0(token);
    if (token.equals(ORETH[chainId])) {
      setToken1(OSETH[chainId]);
    } else if (token.equals(ORUSD[chainId])) {
      setToken1(OSUSD[chainId]);
    }
  }

  async function stake() {
    if (!swapData.token0 || !swapData.token1 || !account.address)
      return toast.custom(<ToastCustom content="Please Connect Wallet" />);
    setLoading(true);
    let data;
    if (swapData.token0.equals(ORETH[chainId])) {
      await approveTokens(addressMap[chainId].ORETH_STAKE);
      data = await writeContract(
        // @ts-ignore
        getOrethStake(chainId, publicClient!, walletClient),
        {
          actionTitle: "stake orEth",
        },
        "stake",
        [
          parseUnits(swapData.token0AmountInput, 18),
          BigInt(sliderValue),
          account.address,
          account.address,
          account.address,
        ],
        {
          account,
        },
      );
    } else {
      await approveTokens(addressMap[chainId].ORUSD_STAKE);
      data = await writeContract(
        // @ts-ignore
        getOrUsdStake(chainId, publicClient!, walletClient),
        {
          actionTitle: "stake orUSD",
        },
        "stake",
        [
          parseUnits(swapData.token0AmountInput, 18),
          BigInt(sliderValue),
          account.address,
          account.address,
          account.address,
        ],
        {
          account,
        },
      );
    }

    if (data && data.status === "success") {
      toast.custom(() => (
        <ToastCustom
          content={
            <>
              {`You have successfully minted ${swapData.token0AmountInput} ${swapData.token1?.symbol} and ${yieldAmount} ${yieldTokenSymbol}`}
              . view on <Link href={blockExplore + "/tx/" + data.transactionHash}>BlastScan</Link>
            </>
          }
        />
      ));
      await updateTokenBalance();
    }
    token0AmountInputHandler("");
    setLoading(false);
  }
  return (
    <div className="flex flex-col items-center">
      <div className="w-[32.9rem] h-[14rem] rounded-xl border-solid border-[0.06rem] border-[#C29BFF] border-opacity-[0.37] flex flex-col justify-around py-2 px-8">
        <div>
          <Input
            placeholder="0.00"
            value={swapData.token0AmountInput}
            onValueChange={(value) => {
              token0AmountInputHandler(value);
            }}
            classNames={{
              base: "h-[2.5rem] text-white",
              input:
                "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-wihte text-[1.25rem] leading-[1.69rem] font-avenir font-black text-right w-[12rem]",
              inputWrapper:
                "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0",
              innerWrapper: "justify-between",
            }}
            startContent={
              <TokenSelect
                tokenList={currencyStakePageSelectList}
                token={swapData.token0}
                tokenDisable={swapData.token1}
                onSelect={onSelectToken0}
              />
            }
          />
          <div className="flex justify-between mt-4">
            <div className="text-white text-opacity-50 flex gap-x-4">
              <span className="text-[0.88rem] leading-[1.19rem] font-avenir font-medium">
                balance: {swapData.token0Balance.toFixed(6)}
              </span>
              <Button
                onClick={() => maxHandler(0)}
                className="text-white text-[0.82rem] font-avenir leading-[1.12rem] font-normal text-opacity-50 bg-transparent rounded-[1.76rem] border-solid border-[0.06rem] border-opacity-30  px-0 min-w-[2.67rem] h-[1.34rem]">
                Max
              </Button>
            </div>
            <span className="text-white text-opacity-50 text-[0.88rem] leading-[1.19rem] font-avenir font-normal">
              ～${}
            </span>
          </div>
        </div>
        <Divider className="w-[30.85rem] border-solid border-[0.06rem] border-[#9A6BE1] border-opacity-10 ml-[-2rem]" />
        <div>
          <Input
            placeholder="0.00"
            value={swapData.token1AmountInput}
            onValueChange={(value) => token1AmountInputHandler(value)}
            classNames={{
              base: "h-[2.5rem] text-white",
              input:
                "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-wihte text-[1.25rem] leading-[1.69rem] font-avenir font-black text-right w-[10rem]",
              inputWrapper:
                "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0",
              innerWrapper: "justify-between",
            }}
            startContent={
              <TokenSelect
                tokenList={currencyStakePageSelectList2}
                tokenDisable={swapData.token0}
                token={swapData.token1}
                onSelect={() => {}}
              />
            }
          />
          <div className="flex justify-between mt-4">
            <div className="text-white text-opacity-50 flex gap-x-4">
              <span className="text-[0.88rem] leading-[1.19rem] font-avenir font-medium">
                balance: {swapData.token1Balance.toFixed(6)}
              </span>
            </div>
            <span className="text-white text-opacity-50 text-[0.88rem] leading-[1.19rem] font-avenir font-normal">
              ～${}
            </span>
          </div>
        </div>
      </div>
      <div className="flex m-8 w-full justify-around items-center">
        <Divider className="w-[8.76rem] border-solid border-[0.06rem] border-[#9A6BE1] border-opacity-30" />
        <span className="text-white font-avenir text-[0.82rem] leading-[1.12rem]">LOCK PERIOD</span>
        <Divider className="w-[8.76rem] border-solid border-[0.06rem] border-[#9A6BE1] border-opacity-30" />
      </div>
      <Input
        value={sliderValue.toString()}
        onValueChange={(value) => setSliderValue(Number(value))}
        classNames={{
          base: "w-[32.9rem] rounded-xl text-white font-medium font-avenir border-[0.03rem] border-[#504360] hover:bg-transparent",
          input: "data-[hover=true]:bg-transparent text-right group-data-[has-value=true]:text-wihte font-black",
          inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
        }}
        startContent={
          <div className="flex h-5 items-center space-x-4 ml-4">
            <p>days</p>
            <Divider orientation="vertical" className="bg-white bg-opacity-30" />
          </div>
        }
      />
      <Slider
        value={sliderValue}
        onChange={(value) => setSliderValue(value as number)}
        color="secondary"
        size="sm"
        step={1}
        maxValue={maxLockedDays}
        minValue={minLockedDays}
        className="w-[32.9rem] mt-[0.88rem]"
        renderThumb={(props) => (
          <div
            {...props}
            className="w-[0.94rem] h-[0.94rem] group p-1 top-1/2 bg-thumb border-[0.13rem] rounded-full cursor-grab data-[dragging=true]:cursor-grabbing">
            <span className="transition-transform bg-thumb rounded-full w-full h-full block group-data-[dragging=true]:scale-80" />
          </div>
        )}
      />

      <div className="flex flex-col gap-y-[0.35rem] w-[32.9rem]  text-[0.82rem] leading-[1.12rem] font-avenir font-medium my-[0.71rem]">
        <div className="flex justify-between w-full text-white">
          <span>Received YieldToken</span>
          <span>
            {yieldAmount} {yieldTokenSymbol}
          </span>
        </div>
        {swapData.token0 && swapData.token1 ? (
          <div className="flex justify-between w-full text-white text-opacity-50">
            <span>Exchange Rate</span>
            <span>
              1{swapData.token0!.symbol} = {exchangeRate} {swapData.token1!.symbol}
            </span>
          </div>
        ) : null}
      </div>
      {swapData.submitButtonStatus === BtnAction.insufficient ? (
        <Button className="bg-button-gradient text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
          insufficient token
        </Button>
      ) : (
        <Button
          onClick={stake}
          isDisabled={swapData.submitButtonStatus === BtnAction.disable}
          isLoading={loading}
          className="bg-button-gradient text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
          {title}
        </Button>
      )}
    </div>
  );
}
