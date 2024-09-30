import { BlockExplorers } from "@/contracts/chains";
import { getOrethStake, getOrUsdStake } from "@/contracts/getTokenContract";
import { OSETH, OSUSD } from "@/contracts/tokens";
import useContract from "@/hooks/useContract";
import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { formatUnits } from "viem";
import { useAccount, useChainId, usePublicClient, useWalletClient } from "wagmi";
import ToastCustom from "./ToastCustom";

export default function UnstakeModal({
  deadline,
  positionId,
  type,
  osAmount,
  orAmount,
}: {
  deadline: number;
  positionId: bigint;
  type: string;
  osAmount: bigint;
  orAmount: bigint;
}) {
  const account = useAccount();
  const chainId = useChainId();
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();

  const { isOpen, onOpen, onClose,onOpenChange } = useDisclosure();
  const { write: writeContract } = useContract();
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false);

  const blockExplore = useMemo(() => {
    return BlockExplorers[chainId];
  }, [chainId]);

  async function unStake() {
    setLoading(true);
    if (!account.address || !publicClient) return toast.custom(<ToastCustom content="Please Connect Wallet" />);
    let data;
    if (type === "ETH") {
      const osBalance = await OSETH[chainId].balanceOf(account.address, publicClient);

      if (osBalance.lessThan(formatUnits(osAmount, 18)))
        return toast.custom(<ToastCustom content="osETH token insufficient" />);
      data = await writeContract(
        // @ts-ignore
        getOrethStake(chainId, publicClient!, walletClient),
        {
          actionTitle: "unLock",
        },
        "unstake",
        [positionId],
        {
          account,
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["orethPositions"],
      });
    } else {
      const osBalance = await OSUSD[chainId].balanceOf(account.address, publicClient);
      if (osBalance.lessThan(formatUnits(osAmount, 18)))
        return toast.custom(<ToastCustom content="osUSD token insufficient" />);
      data = await writeContract(
        // @ts-ignore
        getOrUsdStake(chainId, publicClient!, walletClient),
        {
          actionTitle: "unLock",
        },
        "unstake",
        [positionId],
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
              {`You have successfully withdrawed ${formatUnits(orAmount, 18)} ${
                type === "ETH" ? "orETH" : "orUSD"
              }  . View on `}
              <Link href={blockExplore + "/tx/" + data.transactionHash}>BlastScan</Link>
            </>
          }
        />,
      );
    }
    setLoading(false);
  }

  const checkDeadline = () => {
    if (deadline > Math.floor(new Date().getTime() / 1000)) {
      onOpen();
    } else {
      unStake();
    }
  };

  return (
    <div>
      <Button
        isLoading={loading}
        onClick={checkDeadline}
        className="bg-button-gradient rounded-[5.63rem] text-[0.88rem] text-white leading-5">
        unstake
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          wrapper: "mt-[-4rem]",
          base: "w-[33.88rem] h-[22.75rem] bg-modal border-[0.03rem] rounded-[1.25rem] border-[#504360] shadow-card",
          closeButton: "active:bg-transparent hover:bg-transparent text-white mt-[0.56rem] mr-[0.56rem]",
          body: "mx-4 text-white text-[0.88rem] leading-[1.19rem] mt-[6rem]",
          footer: "mx-4 mt-16",
          backdrop: "backdrop-blur backdrop-opacity-100 bg-transparent",
        }}>
        <ModalContent>
          {() => (
            <div>
              <ModalBody>
                <p className="text-[1.5rem] leading-[2.06rem] w-[22.88rem] text-center font-avenir font-medium">
                  Whether To Force The Closure Of An Unexpired osition?
                </p>
              </ModalBody>
              <ModalFooter>
                <div className="flex justify-between w-full">
                  <Button
                    onPress={() => {
                      onClose();
                    }}
                    className="w-[10rem] h-[3rem] rounded-[4.22rem] font-normal text-[1.25rem] text-white leading-5 border-solid border-[0.06rem] border-white bg-transparent">
                    Cancel
                  </Button>
                  <Button
                    onPress={() => {
                      unStake();
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
