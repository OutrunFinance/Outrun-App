import { ChainId } from "@/contracts/chains";

type AddressMap = { [chainId: number]: string };
export enum ContractName {
  SWAP_ROUTER = "SWAP_ROUTER",
  SWAP_FACTORY = "SWAP_FACTORY",
  ORETH_STAKE = "ORETH_STAKE",
  ORUSD_STAKE = "ORUSD_STAKE",
  ORETH_ORUSD = "ORETH_ORUSD",
  MULTICALL = "MULTICALL",
  ORETH = "ORETH",
  ORUSD = "ORUSD",
  OSUSD = "OSUSD",
  RUY = "RUY",
  REY = "REY",
  OSETH = "OSETH",
}
type ContractAddressMap = Record<ContractName, `0x${string}`>;

export const addressMap = {
  [ChainId.BLAST_SEPOLIA]: {
    [ContractName.SWAP_ROUTER]: "0xff5Ca5f867a03cE04f6ac146d16aF23224518604",
    [ContractName.SWAP_FACTORY]: "0x7388d4A76D6Ec12946652c2953cd17B70E457f03",
    [ContractName.MULTICALL]: "0xca11bde05977b3631167028862be2a173976ca11",
    [ContractName.ORETH_ORUSD]: "0x8677E9D150731bFd63c03C0683d19E3E03c0CAdD",
    [ContractName.ORETH]: "0x99766FEb8EA7F357bDBa860998D1Fb44d7fb89eA",
    [ContractName.ORUSD]: "0x6D78F8523Be0d36DDB874B4db5570c7E034F250A",
    [ContractName.OSUSD]: "0x486741e031C9c76daA4c74aB0E2E9046190b267f",
    [ContractName.REY]: "0x2f66A2Fc3b9bb263347Ef591f1Cd2a3eA82Bd70d",
    [ContractName.RUY]: "0x7f678be74744E5fA44a36c709736F6f557867abA",
    [ContractName.OSETH]: "0x02288a4a965cBA212257b85a809c158e0E85Ac3D",
    [ContractName.ORETH_STAKE]: "0x2FB88bb0fc7175212b49E6577020e74272B28B47",
    [ContractName.ORUSD_STAKE]: "0x082fcCB4Ef497B7cC856e71DcAD81763B15916Bc",
  },
} as Record<number, ContractAddressMap>;

export const initCodeHashMap = {
  [ChainId.BLAST_SEPOLIA]: "0x9d7b24376800c0a5fb253d12673d2021f71732f524fe808d89000739fc93fce8",
} as Record<number, `0x${string}`>;
