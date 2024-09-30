import { ContractName } from "@/contracts/addressMap";
import { getSwapFactory, getSwapRouter } from "@/contracts/getTokenContract";
import { retry } from "radash";
import { useState } from "react";
import { Abi, Address, GetContractReturnType, WalletClient } from "viem";
import { usePublicClient, useWalletClient } from "wagmi";

type Options = {
  loadingModal?: boolean;
  actionTitle: string;
};

type ContractInstance = GetContractReturnType<Abi, WalletClient, Address>;

/**
 * use contract()
 */
export default function useContract() {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [loading, setLoading] = useState(false);

  async function writeAsync(
    contractName: ContractName | ContractInstance,
    opts: Options,
    action: string,
    args: (string | bigint | string[])[],
    _opts: any,
  ) {
    let contract;
    if (!publicClient) return;
    if (typeof contractName !== "string") contract = contractName;
    if (contractName === ContractName.SWAP_ROUTER)
      contract = getSwapRouter(publicClient.chain.id, publicClient, walletClient);
    if (contractName === ContractName.SWAP_FACTORY)
      contract = getSwapFactory(publicClient.chain.id, publicClient, walletClient);
    if (!contract) return;
    const options = Object.assign(
      {
        loadingModal: true,
      },
      opts,
    );

    try {
      setLoading(true);
      // @ts-ignore
      const { result, request } = await contract.simulate[action](args, _opts);

      // @ts-ignore
      const tx = await contract.write[action](request);

      const data = await retry({ times: 20, delay: 5000 }, async () => {
        return await publicClient!.getTransactionReceipt({
          hash: tx as Address,
        });
      });

      setLoading(false);
      return data;
    } catch (err: any) {
      setLoading(false);
      console.log(err);
    }
  }

  return {
    write: writeAsync,
    loading,
  };
}
