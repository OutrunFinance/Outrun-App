import { Button, Divider, Input, Link } from "@nextui-org/react";

export default function YieldPoolTab({
  type,
  avgStakeDays = 0,
  unclaimedYielding = "0",
  apr = "0",
  balance = "0",
  burn,
  amount,
  setAmount,
  loading = false,
}: {
  type: string;
  avgStakeDays: number | undefined;
  unclaimedYielding: string | undefined;
  apr: string | undefined;
  balance: string | undefined;
  amount: string | undefined;
  setAmount: (value: string) => void;
  burn: () => void;
  loading?: boolean;
}) {
  return (
    <div className="flex flex-col items-center text-white font-avenir">
      <div className="w-[33.5rem] h-[6.5rem]  bg-white bg-opacity-[0.03] rounded-[0.25rem] flex gap-x-12 items-center">
        <div className="flex flex-col gap-5 items-center ml-[1.13rem]">
          <span className="text-[1.13rem] leading-[1.56rem] opacity-30">Average Staking Days</span>
          <span className="text-[1.25rem] leading-[1.69rem] font-extrabold">{avgStakeDays}</span>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <span className="text-[1.13rem] leading-[1.56rem] opacity-30">Unclaimed Yield</span>
          <span className="text-[1.25rem] leading-[1.69rem] font-extrabold">{unclaimedYielding}</span>
        </div>
        <div className="flex flex-col gap-5 ml-[1.13rem]">
          <span className="text-[1.13rem] leading-[1.56rem] opacity-30">APR</span>
          <span className="text-[1.25rem] leading-[1.69rem] font-extrabold">{apr}%</span>
        </div>
      </div>
      <span className="text-[1.13rem] leading-[1.56rem] font-medium mt-[2.5rem]">
        Burn {type} To Claim ETH Native Yield
      </span>
      <Input
        value={amount}
        onValueChange={setAmount}
        placeholder="withdraw amount"
        classNames={{
          base: "h-[3.19rem] mt-[0.69rem] rounded-[0.75rem] text-white font-medium font-avenir border-[0.03rem] border-[#504360] hover:bg-transparent w-[33.5rem]",
          mainWrapper: "justify-center",
          input:
            "data-[hover=true]:bg-transparent text-right group-data-[has-value=true]:text-wihte font-black text-[1.13rem] leading-[1.56rem]",
          inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
        }}
        startContent={
          <div className="flex h-full items-center space-x-4">
            <p className="text-[1.13rem] leading-[1.56rem]">Amount</p>
            <Divider orientation="vertical" className="bg-white bg-opacity-30 h-[60%]" />
          </div>
        }
      />
      <div className="flex gap-x-2 mt-[0.81rem] ml-auto mr-10">
        <span>Balance: {balance}</span>
        <Link underline="always" className="text-[#B625FF]" onPress={() => setAmount(balance || "")}>
          MAX
        </Link>
      </div>
      <Button
        isLoading={loading}
        className="mt-[2.88rem] bg-button-gradient w-[12.13rem] h-[3.81rem] rounded-[4.38rem] text-[1.25rem] text-white leading-6"
        onPress={burn}>
        Burn
      </Button>
    </div>
  );
}
