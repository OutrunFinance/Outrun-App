import {
  Button,
  Divider,
  Image,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Switch,
} from "@nextui-org/react";

export default function SwapSetting({
  slippage,
  setSlipPage,
  deadline,
  setDeadline,
  unlimit,
  setUnlimit,
}: {
  slippage: number;
  setSlipPage: (value: number) => void;
  deadline: number;
  setDeadline: (value: number) => void;
  unlimit: boolean;
  setUnlimit: (value: boolean) => void;
}) {
  return (
    <Popover
      placement="bottom"
      offset={10}
      classNames={{
        content:
          "w-[19.12rem] h-[16.29rem] px-[1.18rem] py-[0.88rem] gap-y-4 justify-start items-start bg-transparent bg-blur text-white border-[0.06rem] rounded-[1.25rem] border-[#C29BFF] border-opacity-[0.37] backdrop-blur-sm",
      }}>
      <PopoverTrigger>
        <Button
          isIconOnly
          className="bg-transparent"
          startContent={<Image alt="setting" src="/images/setting.svg" />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <span className="text-[0.82rem] leading-[1.18rem]">Slippage tolerance</span>
        <div className="flex justify-between items-center w-full">
          <RadioGroup
            orientation="horizontal"
            value={slippage.toString()}
            onValueChange={(value) => setSlipPage(Number(value))}
            classNames={{ wrapper: "text-white gap-x-[0.9rem]" }}>
            <Radio
              classNames={{
                base: "p-0 m-0",
                control: "group-data-[selected=true]:bg-white",
                label: "text-white text-[0.71rem] leading-4",
                wrapper: "w-3 h-3 group-data-[selected=true]:border-[#BC48FF]",
              }}
              value="0.1">
              0.1%
            </Radio>
            <Radio
              classNames={{
                base: "p-0 m-0",
                control: "group-data-[selected=true]:bg-white",
                label: "text-white text-[0.71rem] leading-4",
                wrapper: "w-3 h-3 group-data-[selected=true]:border-[#BC48FF]",
              }}
              value="0.5">
              0.5%
            </Radio>
            <Radio
              classNames={{
                base: "p-0 m-0",
                control: "group-data-[selected=true]:bg-white",
                label: "text-white text-[0.71rem] leading-4",
                wrapper: "w-3 h-3 group-data-[selected=true]:border-[#BC48FF]",
              }}
              value="1">
              1%
            </Radio>
          </RadioGroup>
          <div className="w-[6rem] flex justify-between items-center">
            <Input
              onValueChange={(value) => setSlipPage(Number(value))}
              placeholder="1.0"
              classNames={{
                base: "w-[4.71rem] h-[1rem] mt-[-0.5rem]",
                inputWrapper:
                  "w-[4.71rem] min-h-[1.5rem] bg-transparent data-[hover=true]:bg-transparent rounded-[0.35rem] border-solid border-[0.03rem] border-[#48376F] group-data-[focus=true]:bg-transparent",
                input:
                  "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-wihte text-[0.71rem] leading-[1rem] font-avenir font-black text-center w-full",
              }}
            />
            <span>%</span>
          </div>
        </div>
        <Divider className="border-solid border-[0.06rem] border-[#9A6BE1] border-opacity-10 w-[19.12rem] ml-[-1.18rem]" />
        <span className="text-[0.82rem] leading-[1.18rem]">Ttransaction Deadline (min)</span>
        <div className="flex justify-between items-center w-full">
          <RadioGroup
            orientation="horizontal"
            value={deadline.toString()}
            onValueChange={(value) => setDeadline(Number(value))}>
            <Radio
              classNames={{
                base: "p-0 m-0",
                control: "group-data-[selected=true]:bg-white",
                label: "text-white text-[0.71rem] leading-4",
                wrapper: "w-3 h-3 group-data-[selected=true]:border-[#BC48FF]",
              }}
              value="10">
              10m
            </Radio>
            <Radio
              classNames={{
                base: "p-0 m-0",
                control: "group-data-[selected=true]:bg-white",
                label: "text-white text-[0.71rem] leading-4",
                wrapper: "w-3 h-3 group-data-[selected=true]:border-[#BC48FF]",
              }}
              value="20">
              20m
            </Radio>
            <Radio
              classNames={{
                base: "p-0 m-0",
                control: "group-data-[selected=true]:bg-white",
                label: "text-white text-[0.71rem] leading-4",
                wrapper: "w-3 h-3 group-data-[selected=true]:border-[#BC48FF]",
              }}
              value="30">
              30m
            </Radio>
          </RadioGroup>
          <div className="w-[6rem] flex justify-between items-center">
            <Input
              onValueChange={(value) => setDeadline(Number(value))}
              placeholder="1.0"
              classNames={{
                base: "w-[4.71rem] h-[1rem] mt-[-0.5rem]",
                inputWrapper:
                  "w-[4.71rem] min-h-[1.5rem] bg-transparent data-[hover=true]:bg-transparent rounded-[0.35rem] border-solid border-[0.03rem] border-[#48376F] group-data-[focus=true]:bg-transparent",
                input:
                  "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-wihte text-[0.71rem] leading-[1rem] font-avenir font-black text-center w-full",
              }}
            />
            <span>m</span>
          </div>
        </div>
        <Divider className="border-solid border-[0.06rem] border-[#9A6BE1] border-opacity-10 w-[19.12rem] ml-[-1.18rem]" />
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col">
            <span className="text-white text-[0.82rem] leading-[1.18rem] font-avenir">Approve Unlimited Amount</span>
            <span className="text-white text-[0.76rem] leading-[1.06rem] text-opacity-30 font-avenir">
              Turn on approval for unlimited spending for all tokens
            </span>
          </div>
          <Switch
            isSelected={unlimit}
            onValueChange={setUnlimit}
            aria-label="Approve Unlimited Amount"
            classNames={{
              thumb: "group-data-[selected=true]:bg-[#F0E0F9] bg-[#F0E0F9]",
              wrapper: "group-data-[selected=true]:bg-button-gradient bg-white bg-opacity-[0.12] w-[3.12rem]",
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
