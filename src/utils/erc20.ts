import { getERC20Token } from "@/contracts/getTokenContract";
import { type Address, type PublicClient } from "viem";

export async function fetchTokenByAddress(address: Address, publicClient: PublicClient) {
  const erc20 = getERC20Token(address, publicClient);
  const symbol = (await erc20.read.symbol()) || "unknown";
  const name = (await erc20.read.name()) || "unknown";
  const decimals = await erc20.read.decimals();
  return {
    symbol,
    name,
    decimals,
  };
}
