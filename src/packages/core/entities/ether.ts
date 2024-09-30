import { WETH9 } from "@/contracts/tokens";
import invariant from "tiny-invariant";
import { Address, formatEther, PublicClient } from "viem";
import { getBalance } from "viem/actions";
import { Currency } from "./currency";
import { NativeCurrency } from "./nativeCurrency";
import { Token } from "./token";

import Decimal from "decimal.js-light";
/**
 * Ether is the main usage of a 'native' currency, i.e. for Ethereum mainnet and all testnets
 */
export class Ether extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, "ETH", "Ether");
  }

  public get wrapped(): Token {
    const weth9 = WETH9[this.chainId];
    invariant(!!weth9, "WRAPPED");
    return weth9;
  }

  private static _etherCache: { [chainId: number]: Ether } = {};

  public static onChain(chainId: number): Ether {
    return this._etherCache[chainId] ?? (this._etherCache[chainId] = new Ether(chainId));
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }
  public async balanceOf(account: Address, publicClient: PublicClient): Promise<Decimal> {
    return new Decimal(
      formatEther(
        await getBalance(publicClient, {
          address: account,
        }),
      ),
    );
  }
}
