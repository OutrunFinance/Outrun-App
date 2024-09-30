"use client";
import { BlockExplorers } from "@/contracts/chains";
import { currencySelectList } from "@/contracts/currencys";
import useContract from "@/hooks/useContract";
import { BtnAction, SwapView, useSwap } from "@/hooks/useSwap";
import { Accordion, AccordionItem, Button, Divider, Image, Input, Tab, Tabs } from "@nextui-org/react";
import { useMemo } from "react";
import { useAccount, useChainId, usePublicClient, useWalletClient } from "wagmi";
import TokenSelect from "../TokenSelect";
import SwapSetting from "./SwapSetting";

export default function SwapCard() {
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
    setSlippage,
    setTransactionDeadline,
    setUnlimitedAmount,
    setToken0AmountInput,
    setToken1AmountInput,
    updateTokenBalance,
    token0AmountInputHandler,
    token1AmountInputHandler,
    maxHandler,
  } = useSwap({
    view: SwapView.swap,
    getTradeRoute: true,
  });

  const blockExplore = useMemo(() => {
    return BlockExplorers[chainId];
  }, [chainId]);

  const onReverse = () => {
    if (!swapData.token0 || !swapData.token1) return;
    setToken0(swapData.token1);
    setToken1(swapData.token0);
    token0AmountInputHandler("");
    token1AmountInputHandler("");
  };

  return (
    <div className="w-[34.18rem] min-h-[26.59rem] shadow-card bg-modal border-[0.06rem] rounded-[1.25rem] border-card relative">
      <div className="absolute z-10 text-white top-[2.29rem] right-[2.71rem]">
        <SwapSetting
          slippage={swapData.slippage}
          setSlipPage={setSlippage}
          deadline={swapData.transactionDeadline}
          setDeadline={setTransactionDeadline}
          unlimit={swapData.unlimitedAmount}
          setUnlimit={setUnlimitedAmount}
        />
      </div>
      <Tabs
        aria-label="swap"
        classNames={{
          base: "w-full",
          tab: "h-full data-[hover-unselected=true]:opacity-100 bg-transparent font-kronaOne",
          tabList: "h-full flex gap-x-8 rounded-none px-8 pt-8 bg-transparent",
          tabContent:
            "text-white group-data-[selected=true]:bg-title text-[1.5rem] leading-[1.88rem] font-kronaOne group-data-[selected=true]:text-transparent group-data-[selected=true]:bg-clip-text",
          cursor: "bg-transparent",
          panel: "mx-10 mb-8",
        }}>
        <Tab key="swap" title="Swap">
          <div className="flex flex-col items-center">
            <div className="w-full h-[14rem] rounded-xl border-solid border-[0.06rem] border-[#C29BFF] border-opacity-[0.37] flex flex-col justify-around py-2 px-8 relative">
              <Button isIconOnly className="bg-transparent absolute left-[50%] top-[41%]" onClick={onReverse}>
                <Image alt="transfer" src="/images/transfer-bg.svg" />
              </Button>
              <div>
                <Input
                  placeholder="0.00"
                  value={swapData.token0AmountInput}
                  onValueChange={(value) => {
                    setToken0AmountInput(value);
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
                      tokenList={currencySelectList}
                      token={swapData.token0}
                      tokenDisable={swapData.token1}
                      onSelect={setToken0}
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
                    --{}
                  </span>
                </div>
              </div>
              <Divider className="w-[28.5rem] border-solid border-[0.06rem] border-[#9A6BE1] border-opacity-10 ml-[-2rem]" />
              <div>
                <Input
                  placeholder="0.00"
                  value={swapData.token1AmountInput}
                  onValueChange={(value) => setToken1AmountInput(value)}
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
                      tokenList={currencySelectList}
                      tokenDisable={swapData.token0}
                      token={swapData.token1}
                      onSelect={setToken1}
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
                    --{}
                  </span>
                </div>
              </div>
            </div>
            {swapData?.token0 && swapData?.token1 && (
              <div className="w-full mt-[1.18rem] rounded-xl border-solid border-[0.06rem] border-[#C29BFF] border-opacity-[0.37] px-5">
                <Accordion selectionMode="single">
                  <AccordionItem
                    key="1"
                    aria-label=""
                    title={
                      <div className="text-white font-avenir font-extrabold text-[0.82rem] leading-[1.18rem] flex gap-2">
                        {`1 ${swapData.token0?.symbol} = ${swapData.exchangeRate} ${swapData.token1?.symbol} `}
                        <span className="font-normal text-white text-opacity-50">{`($1.00)`}</span>
                      </div>
                    }>
                    <Divider className="w-[28.5rem] border-solid border-[0.06rem] border-[#9A6BE1] border-opacity-10 mt-[-0.5rem] ml-[-1.75rem]" />
                    <div className="flex flex-col gap-y-3 text-white font-avenir font-normal text-[0.82rem] leading-[1.18rem] my-4">
                      <div className="flex justify-between ">
                        <span className="text-opacity-50 text-white flex items-center gap-x-1">
                          Price Impact: <Image alt="notice" src="/images/error.svg" className="w-[1rem] h-[1rem]" />
                        </span>
                        <span className="font-extrabold">
                          {swapData.priceImpact ? `${swapData.priceImpact}%` : "---"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-opacity-50 text-white">Min.received:</span>
                        <span className="font-extrabold">{`${swapData.minimalReceive} ${swapData.token1.symbol}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-opacity-50 text-white">Max.Slippage:</span>
                        <span className="font-extrabold">{swapData.slippage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-opacity-50 text-white">Route:</span>
                        <span className="font-extrabold">view Route</span>
                      </div>
                    </div>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {swapData.submitButtonStatus === BtnAction.insufficient ? (
              <Button className="bg-button-gradient mt-8 text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
                insufficient token
              </Button>
            ) : (
              <Button
                onPress={() => {}}
                isDisabled={swapData.submitButtonStatus === BtnAction.disable}
                isLoading={loading}
                className="bg-button-gradient mt-8 text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
                Swap
              </Button>
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
