import { addressMap } from "@/contracts/addressMap";
import { BlockExplorers } from "@/contracts/chains";
import { currencyMintPageSelectList } from "@/contracts/currencys";
import { getORETH, getORUSD } from "@/contracts/getTokenContract";
import { ORETH, ORUSD, USDB } from "@/contracts/tokens";
import useContract from "@/hooks/useContract";
import { BtnAction, SwapView, useSwap } from "@/hooks/useSwap";
import { Ether, type Currency } from "@/packages/core";
import { Button, Divider, Image, Input, Link } from "@nextui-org/react";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { parseEther, parseUnits } from "viem";
import { useAccount, useChainId, usePublicClient, useWalletClient } from "wagmi";
import ToastCustom from "./ToastCustom";
import TokenSelect from "./TokenSelect";

export default function MintTab() {
  const chainId = useChainId();
  const account = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { write: writeContract } = useContract();

  const {
    swapData,
    loading,
    setToken0,
    setToken1,
    setLoading,
    approveTokens,
    token0AmountInputHandler,
    updateTokenBalance,
    token1AmountInputHandler,
    maxHandler,
  } = useSwap({
    view: SwapView.mint,
  });

  const blockExplore = useMemo(() => {
    return BlockExplorers[chainId];
  }, [chainId]);

  const title = useMemo(() => {
    if (!swapData.token0) return "Choose Token";
    if (swapData.token0.equals(Ether.onChain(chainId))) {
      return "Mint orETH";
    } else if (swapData.token0.equals(ORETH[chainId])) {
      return "Redeem ETH";
    } else if (swapData.token0.equals(USDB[chainId])) {
      return "Mint orUSD";
    } else {
      return "Redeem USDB";
    }
  }, [swapData.token0, chainId]);

  useEffect(() => {
    setToken0(Ether.onChain(chainId));
    setToken1(ORETH[chainId]);
  }, [chainId]);

  const onReverse = () => {
    if (!swapData.token0 || !swapData.token1) return;
    setToken0(swapData.token1);
    setToken1(swapData.token0);
  };

  function onSelectToken0(token: Currency) {
    setToken0(token);
    if (token.equals(Ether.onChain(chainId))) {
      setToken1(ORETH[chainId]);
    } else if (token.equals(ORETH[chainId])) {
      setToken1(Ether.onChain(chainId));
    } else if (token.equals(USDB[chainId])) {
      setToken1(ORUSD[chainId]);
    } else {
      setToken1(USDB[chainId]);
    }
  }

  async function swap() {
    if (!swapData.token0 || !swapData.token1 || !account.address)
      return toast.custom(<ToastCustom content="Please Connect Wallet" />);
    setLoading(true);
    if (swapData.isTransformView) {
      let data;
      if (swapData.token0.isNative) {
        // eth -> oreth
        data = await writeContract(
          // @ts-ignore
          getORETH(chainId, publicClient!, walletClient),
          {
            actionTitle: title,
          },
          "deposit",
          [],
          {
            account,
            value: parseEther(swapData.token0AmountInput),
          },
        );
      } else if (swapData.token1.isNative) {
        await approveTokens(addressMap[chainId].ORETH);
        // oreth=>eth
        data = await writeContract(
          // @ts-ignore
          getORETH(chainId, publicClient!, walletClient),
          {
            actionTitle: title,
          },
          "withdraw",
          [parseEther(swapData.token0AmountInput)],
          {
            account,
          },
        );
      } else if (swapData.token0.equals(USDB[chainId])) {
        // usdb -> orusd
        await approveTokens(addressMap[chainId].ORUSD);
        data = await writeContract(
          // @ts-ignore
          getORUSD(chainId, publicClient, walletClient),
          {
            actionTitle: title,
          },
          "deposit",
          [parseUnits(swapData.token0AmountInput, 18)],
          {
            account,
          },
        );
      } else {
        // orusd -> usdb
        await approveTokens(addressMap[chainId].ORUSD);
        data = await writeContract(
          // @ts-ignore
          getORUSD(chainId, publicClient, walletClient),
          {
            actionTitle: title,
          },
          "withdraw",
          [parseUnits(swapData.token0AmountInput, 18)],
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
                {`You have successfully minted ${swapData.token0AmountInput} ${swapData.token1?.symbol}`}. view on{" "}
                <Link href={blockExplore + "/tx/" + data.transactionHash}>BlastScan</Link>
              </>
            }
          />
        ));
        await updateTokenBalance();
      }
    }
    token0AmountInputHandler("");
    setLoading(false);
  }
  return (
    <div className="flex flex-col items-center">
      <div className="w-[32.9rem] h-[14rem] rounded-xl border-solid border-[0.06rem] border-[#C29BFF] border-opacity-[0.37] flex flex-col justify-around py-2 px-8 relative">
        <Button isIconOnly className="bg-transparent absolute left-[50%] top-[41%]" onClick={onReverse}>
          <Image alt="transfer" src="/images/transfer-bg.svg" />
        </Button>
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
                tokenList={currencyMintPageSelectList}
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
                tokenList={currencyMintPageSelectList}
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
      {swapData.token0 && swapData.token1 ? (
        <div className="flex justify-between px-8 w-[32.9rem] mt-[0.79rem] text-white text-opacity-50 text-[0.82rem] leading-[1.12rem] font-avenir font-medium">
          <span>Exchange Rate</span>
          <span>
            1 {swapData.token0!.symbol} = 1 {swapData.token1!.symbol}
          </span>
        </div>
      ) : null}

      {swapData.submitButtonStatus === BtnAction.insufficient ? (
        <Button className="bg-button-gradient mt-8 text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
          insufficient token
        </Button>
      ) : (
        <Button
          onPress={swap}
          isDisabled={swapData.submitButtonStatus === BtnAction.disable}
          isLoading={loading}
          className="bg-button-gradient mt-8 text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
          {title}
        </Button>
      )}
    </div>
  );
}
