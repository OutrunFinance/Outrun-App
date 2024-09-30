import { BaseCurrency } from './baseCurrency';
import Decimal from 'decimal.js-light';
import { Address, PublicClient } from 'viem';
/**
 * Represents the native currency of the chain on which it resides, e.g.
 */
export abstract class NativeCurrency extends BaseCurrency {
  public readonly isNative: true = true;
  public readonly isToken: false = false;
  public abstract balanceOf(account: Address, publicClient: PublicClient): Promise<Decimal>;
}
