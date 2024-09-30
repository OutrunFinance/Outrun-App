import { ORETH } from "@/contracts/tokens";
import { Currency, Token } from "@/packages/core";
import { NativeCurrency } from "@/packages/core/entities/nativeCurrency";
// import { WNATIVE, NATIVE } from '../constants'
import { Address, PublicClient, formatEther } from "viem";
import { getBalance } from "viem/actions";

import Decimal from "decimal.js-light";

/**
 *
 * Native
 */
export class Native extends NativeCurrency {
  public readonly isNative: true = true;
  public readonly isToken: false = false;
  public async balanceOf(account: Address, publicClient: PublicClient): Promise<Decimal> {
    return new Decimal(
      formatEther(
        await getBalance(publicClient, {
          address: account,
        }),
      ),
    );
  }
  protected constructor({
    chainId,
    decimals,
    name,
    symbol,
  }: {
    chainId: number;
    decimals: number;
    symbol: string;
    name: string;
  }) {
    super(chainId, decimals, symbol, name);
  }

  public get wrapped(): Token {
    return ORETH[this.chainId];
  }

  private static cache: { [chainId: number]: Native } = {};

  public static onChain(chainId: number): Native {
    if (chainId in this.cache) {
      return this.cache[chainId];
    }
    return (this.cache[chainId] = new Native({ chainId, decimals: 18, symbol: "ETH", name: "ETH" }));
    // invariant(!!NATIVE[chainId as keyof typeof NATIVE], 'NATIVE_CURRENCY');
    // const { decimals, name, symbol } = WETH9[chainId];
    // // eslint-disable-next-line no-return-assign
    // return (this.cache[chainId] = new Native({ chainId, decimals, symbol, name }));
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }
}
