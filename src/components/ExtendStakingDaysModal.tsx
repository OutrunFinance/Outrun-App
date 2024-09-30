import { maxLockupDays, minLockupDays, oneDaySec } from "@/constants";
import { BlockExplorers } from "@/contracts/chains";
import { getOrethStake, getOrUsdStake } from "@/contracts/getTokenContract";
import useContract from "@/hooks/useContract";
import {
  Button,
  Divider,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Slider,
  useDisclosure,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { formatUnits } from "viem";
import { useAccount, useChainId, usePublicClient, useWalletClient } from "wagmi";
import ToastCustom from "./ToastCustom";

export default function ExtendStakingDaysModal({
  positionId,
  type,
  deadline,
  orAmount,
}: {
  deadline: number;
  type: string;
  positionId: bigint;
  orAmount: bigint;
}) {
  const account = useAccount();
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const chainId = useChainId();

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [days, setDays] = useState<number>(0);
  const { write: writeContract } = useContract();
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false);

  const blockExplore = useMemo(() => {
    return BlockExplorers[chainId];
  }, [chainId]);

  const minDayCalc = useMemo(() => {
    const minLockSecond = minLockupDays * oneDaySec; // 最小锁定秒数，minLockupDays从合约获得
    const newDeadLine = minLockSecond + Math.floor(new Date().getTime() / 1000); // 最小新DeadLine，currentTimestampSecond是系统当前时间戳，单位为秒
    return Math.max(Math.floor((newDeadLine - deadline) / oneDaySec), 1);
  }, [deadline]);

  const maxDayCalc = useMemo(() => {
    const maxLockSecond = maxLockupDays * oneDaySec; // 最小锁定秒数，minLockupDays从合约获得
    const newDeadLine = maxLockSecond + Math.floor(new Date().getTime() / 1000); // 最小新DeadLine，currentTimestampSecond是系统当前时间戳，单位为秒
    return Math.max(Math.floor((newDeadLine - deadline) / oneDaySec), 1);
  }, [deadline]);

  const validateInput = (value: string) => {
    const inputContent = parseFloat(value);
    if (!isNaN(inputContent) && inputContent >= minDayCalc && inputContent <= maxDayCalc) {
      setDays(inputContent);
    }
  };

  async function onConfirmExtend() {
    setLoading(true);
    if (!account.address || !publicClient) return toast.custom(<ToastCustom content="Please Connect Wallet" />);
    let data;
    if (type === "ETH") {
      data = await writeContract(
        // @ts-ignore
        getOrethStake(chainId, publicClient!, walletClient),
        {
          actionTitle: "extend lockup days",
        },
        "extendLockTime",
        [Number(positionId), days],
        {
          account,
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["orethPositions"],
      });
    } else {
      data = await writeContract(
        // @ts-ignore
        getOrUsdStake(chainId, publicClient!, walletClient),
        {
          actionTitle: "extend lockup days",
        },
        "extendLockTime",
        [Number(positionId), days],
        {
          account,
        },
      );
      queryClient.invalidateQueries({
        queryKey: ["orusdPositions"],
      });
    }
    if (data && data.status === "success") {
      toast.custom(
        <ToastCustom
          content={
            <>
              {`You have successfully received ${Number(formatUnits(orAmount, 18)) * days} ${
                type === "ETH" ? "REY" : "RUY"
              }. View on `}
              <Link href={blockExplore + "/tx/" + data.transactionHash}>BlastScan</Link>
            </>
          }
        />,
      );
    }
    setLoading(false);
  }

  return (
    <div>
      <Button
        isLoading={loading}
        onClick={onOpen}
        className="rounded-[5.63rem] text-[0.88rem] text-white leading-5 border-solid border-[0.06rem] border-white bg-transparent">
        Extend Staking Days
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          wrapper: "mt-[-4rem]",
          base: "w-[33.88rem] h-[22.75rem] bg-modal border-[0.03rem] rounded-[1.25rem] border-[#504360] shadow-card",
          header: "bg-title text-[1.5rem] leading-[1.88rem] font-kronaOne text-transparent bg-clip-text ml-3",
          closeButton: "active:bg-transparent hover:bg-transparent text-white mt-[0.56rem] mr-[0.56rem]",
          body: "mx-4 text-white text-[0.88rem] leading-[1.19rem]",
          footer: "mx-4 mt-16",
          backdrop: "backdrop-blur backdrop-opacity-100 bg-transparent",
        }}>
        <ModalContent>
          {() => (
            <div>
              <ModalHeader>Extend Lock days</ModalHeader>
              <ModalBody>
                <Input
                  value={String(days)}
                  onValueChange={(value) => validateInput(value)}
                  classNames={{
                    base: "rounded-xl text-white font-medium font-avenir border-[0.03rem] border-[#504360] hover:bg-transparent",
                    input:
                      "data-[hover=true]:bg-transparent text-right group-data-[has-value=true]:text-wihte font-black",
                    inputWrapper:
                      "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
                  }}
                  startContent={
                    <div className="flex h-5 items-center space-x-4 ml-4">
                      <p>days</p>
                      <Divider orientation="vertical" className="bg-white bg-opacity-30" />
                    </div>
                  }
                />
                <Slider
                  isDisabled={maxDayCalc === minDayCalc}
                  value={days}
                  onChange={(value) => setDays(value as number)}
                  color="secondary"
                  size="sm"
                  step={1}
                  maxValue={maxDayCalc}
                  minValue={minDayCalc}
                  className="max-w-md mt-8"
                  renderThumb={(props) => (
                    <div
                      {...props}
                      className="w-[0.94rem] h-[0.94rem] group p-1 top-1/2 bg-thumb border-[0.13rem] rounded-full cursor-grab data-[dragging=true]:cursor-grabbing">
                      <span className="transition-transform bg-thumb rounded-full w-full h-full block group-data-[dragging=true]:scale-80" />
                    </div>
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <div className="flex justify-between w-full">
                  <Button
                    onPress={onClose}
                    className="w-[10rem] h-[3rem] rounded-[4.22rem] font-normal text-[1.25rem] text-white leading-5 border-solid border-[0.06rem] border-white bg-transparent">
                    Cancel
                  </Button>
                  <Button
                    onPress={() => {
                      onConfirmExtend();
                      onClose();
                    }}
                    className="w-[10rem] h-[3rem] bg-button-gradient rounded-[4.22rem] text-[1.25rem] font-normal text-white leading-5">
                    Confirm
                  </Button>
                </div>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
