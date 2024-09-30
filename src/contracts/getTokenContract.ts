import { getContract, type Address, type PublicClient, type WalletClient } from "viem";
import { erc20 } from "./abis/erc20";
import { orETH } from "./abis/orETH";
import { orETHStake } from "./abis/orETHStake";
import { orUSD } from "./abis/orUSD";
import { orUSDStake } from "./abis/orUsdStake";
import { swapFactory } from "./abis/swapFactory";
import { swapRouter } from "./abis/swapRouter";
import { addressMap } from "./addressMap";
import type { ChainId } from "./chains";

function getERC20Token(address: Address, publicClient: PublicClient, wallet?: WalletClient) {
  return getContract({
    abi: erc20,
    address,
    client: {
      wallet,
      public: publicClient,
    },
  });
}

function getORETH(chainId: ChainId, publicClient: PublicClient, wallet?: WalletClient) {
  return getContract({
    abi: orETH,
    address: addressMap[chainId].ORETH,
    client: {
      wallet,
      public: publicClient,
    },
  });
}

function getOrethStake(chainId: ChainId, publicClient: PublicClient, wallet?: WalletClient) {
  return getContract({
    abi: orETHStake,
    address: addressMap[chainId].ORETH_STAKE,
    client: {
      wallet,
      public: publicClient,
    },
  });
}

function getORUSD(chainId: ChainId, publicClient: PublicClient, wallet?: WalletClient) {
  return getContract({
    abi: orUSD,
    address: addressMap[chainId].ORUSD,
    client: {
      wallet,
      public: publicClient,
    },
  });
}

function getOrUsdStake(chainId: ChainId, publicClient: PublicClient, wallet?: WalletClient) {
  return getContract({
    abi: orUSDStake,
    address: addressMap[chainId].ORUSD_STAKE,
    client: {
      wallet,
      public: publicClient,
    },
  });
}

function getSwapFactory(chainId: ChainId, publicClient: PublicClient, wallet?: WalletClient) {
  return getContract({
    abi: swapFactory,
    address: addressMap[chainId].SWAP_FACTORY,
    client: {
      wallet,
      public: publicClient,
    },
  });
}

function getSwapRouter(chainId: ChainId, publicClient: PublicClient, wallet?: WalletClient) {
  return getContract({
    abi: swapRouter,
    address: addressMap[chainId].SWAP_ROUTER,
    client: {
      wallet,
      public: publicClient,
    },
  });
}

export { getERC20Token, getORETH, getOrethStake, getORUSD, getOrUsdStake, getSwapFactory, getSwapRouter };
