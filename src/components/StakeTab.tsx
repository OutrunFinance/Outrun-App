import { Button, Divider, Input, Link, Slider } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useChainId } from "wagmi";
import ToastCustom from "./ToastCustom";
import TokenSelect from "./TokenSelect";

const mockTokens = {
  ETH: { symbol: "ETH", name: "Ethereum" },
  NrETH: { symbol: "NrETH", name: "Nested rETH" },
  "PT-BETH": { symbol: "PT-BETH", name: "Principal Token BETH" },
  "YT-BETH": { symbol: "YT-BETH", name: "Yield Token BETH" },
};

export default function StakeTab() {
  const chainId = useChainId();
  const account = useAccount();
  const [sliderValue, setSliderValue] = useState(365);
  const [token0, setToken0] = useState(mockTokens.ETH);
  const [token1, setToken1] = useState(mockTokens["PT-BETH"]);
  const [token0Amount, setToken0Amount] = useState("");
  const [token1Amount, setToken1Amount] = useState("");

  const title = useMemo(() => {
    if (!token0) return "Choose Token";
    return `Stake ${token0.symbol}`;
  }, [token0]);

  const exchangeRate = useMemo(() => {
    return 1.05; // Mock exchange rate
  }, []);

  useEffect(() => {
    if (token0Amount && !isNaN(+token0Amount)) {
      setToken1Amount((+token0Amount * exchangeRate).toFixed(6));
    } else {
      setToken1Amount("");
    }
  }, [token0Amount, exchangeRate]);

  function onSelectToken0(token: any) {
    setToken0(token);
  }

  async function stake() {
    if (!account.address)
      return toast.custom(<ToastCustom content="Please Connect Wallet" />);

    // Mock stake function
    toast.custom(() => (
      <ToastCustom
        content={
          <>
            {`You have successfully staked ${token0Amount} ${token0.symbol} for ${token1Amount} ${token1.symbol}`}
            . View on <Link href="#">BlockExplorer</Link>
          </>
        }
      />
    ));

    setToken0Amount("");
    setToken1Amount("");
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-[32.9rem] h-[21rem] rounded-xl border-solid border-[0.06rem] border-[#C29BFF] border-opacity-[0.37] flex flex-col justify-around py-2 px-8">
        <div>
          <Input
            placeholder="0.00"
            value={token0Amount}
            onValueChange={setToken0Amount}
            classNames={{
              base: "h-[2.5rem] text-white",
              input: "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-white text-[1.25rem] leading-[1.69rem] font-avenir font-black text-right w-[12rem]",
              inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0",
              innerWrapper: "justify-between",
            }}
            startContent={
              <TokenSelect
                tokenList={[mockTokens.ETH, mockTokens.NrETH]}
                token={token0 as any}
                onSelect={onSelectToken0}
              />
            }
          />
          <div className="flex justify-between mt-4">
            <div className="text-white text-opacity-50 flex gap-x-4">
              <span className="text-[0.88rem] leading-[1.19rem] font-avenir font-medium">
                balance: 10.000000
              </span>
              <Button
                onClick={() => setToken0Amount("10")}
                className="text-white text-[0.82rem] font-avenir leading-[1.12rem] font-normal text-opacity-50 bg-transparent rounded-[1.76rem] border-solid border-[0.06rem] border-opacity-30  px-0 min-w-[2.67rem] h-[1.34rem]">
                Max
              </Button>
            </div>
            <span className="text-white text-opacity-50 text-[0.88rem] leading-[1.19rem] font-avenir font-normal">
              ～$0
            </span>
          </div>
        </div>
        <Divider className="w-[30.85rem] border-solid border-[0.06rem] border-[#9A6BE1] border-opacity-10 ml-[-2rem]" />
        <div>
          <Input
            placeholder="0.00"
            value={token1Amount}
            readOnly
            classNames={{
              base: "h-[2.5rem] text-white",
              input: "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-white text-[1.25rem] leading-[1.69rem] font-avenir font-black text-right w-[10rem]",
              inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0",
              innerWrapper: "justify-between",
            }}
            startContent={
              <TokenSelect
                tokenList={[mockTokens["PT-BETH"], mockTokens["YT-BETH"]]}
                token={token1 as any}
                onSelect={() => {}}
              />
            }
          />
          <div className="flex justify-between mt-4">
            <div className="text-white text-opacity-50 flex gap-x-4">
              <span className="text-[0.88rem] leading-[1.19rem] font-avenir font-medium">
                balance: 0.000000
              </span>
            </div>
            <span className="text-white text-opacity-50 text-[0.88rem] leading-[1.19rem] font-avenir font-normal">
              ～$0
            </span>
          </div>
        </div>
        <Divider className="w-[30.85rem] border-solid border-[0.06rem] border-[#9A6BE1] border-opacity-10 ml-[-2rem]" />
        <div>
          <Input
            placeholder="0.00"
            value=""
            readOnly
            classNames={{
              base: "h-[2.5rem] text-white",
              input: "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-white text-[1.25rem] leading-[1.69rem] font-avenir font-black text-right w-[10rem]",
              inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0",
              innerWrapper: "justify-between",
            }}
            startContent={
              <TokenSelect
                tokenList={[mockTokens["YT-BETH"]]}
                token={mockTokens["YT-BETH"] as any}
                onSelect={() => {}}
              />
            }
          />
          <div className="flex justify-between mt-4">
            <div className="text-white text-opacity-50 flex gap-x-4">
              <span className="text-[0.88rem] leading-[1.19rem] font-avenir font-medium">
                balance: 0.000000
              </span>
            </div>
            <span className="text-white text-opacity-50 text-[0.88rem] leading-[1.19rem] font-avenir font-normal">
              ～$0
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
          input: "data-[hover=true]:bg-transparent text-right group-data-[has-value=true]:text-white font-black",
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
        maxValue={365}
        minValue={7}
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
        <div className="flex justify-between w-full text-white text-opacity-50">
          <span>Exchange Rate</span>
          <span>
            1 {token0.symbol} = {exchangeRate} {token1.symbol}
          </span>
        </div>
      </div>
      <Button
        onClick={stake}
        isDisabled={!token0Amount || !token1Amount}
        className="bg-button-gradient text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
        {title}
      </Button>
    </div>
  );
}
