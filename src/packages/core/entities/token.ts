import Decimal from "decimal.js-light";
import JSBI from "jsbi";
import invariant from "tiny-invariant";
import { Address, PublicClient, WalletClient, formatUnits, getContract } from "viem";
import { BigintIsh } from "../constants";
import { checkValidAddress, validateAndParseAddress } from "../utils/validateAndParseAddress";
import { BaseCurrency } from "./baseCurrency";
import { Currency } from "./currency";

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends BaseCurrency {
  public readonly isNative: false = false;
  public readonly isToken: true = true;

  /**
   * The contract address on the chain on which this token lives
   */
  public readonly address: string;

  /**
   * Relevant for fee-on-transfer (FOT) token taxes,
   * Not every ERC20 token is FOT token, so this field is optional
   */
  public readonly buyFeeBps?: BigintIsh;
  public readonly sellFeeBps?: BigintIsh;

  /**
   *
   * @param chainId {@link BaseCurrency#chainId}
   * @param address The contract address on the chain on which this token lives
   * @param decimals {@link BaseCurrency#decimals}
   * @param symbol {@link BaseCurrency#symbol}
   * @param name {@link BaseCurrency#name}
   * @param bypassChecksum If true it only checks for length === 42, startsWith 0x and contains only hex characters
   * @param buyFeeBps Buy fee tax for FOT tokens, in basis points
   * @param sellFeeBps Sell fee tax for FOT tokens, in basis points
   */
  public constructor(
    chainId: number,
    address: string,
    decimals: number,
    symbol?: string,
    name?: string,
    bypassChecksum?: boolean,
    buyFeeBps?: BigintIsh,
    sellFeeBps?: BigintIsh,
  ) {
    super(chainId, decimals, symbol, name);
    if (bypassChecksum) {
      this.address = checkValidAddress(address);
    } else {
      this.address = validateAndParseAddress(address);
    }
    if (buyFeeBps) {
      invariant(JSBI.GE(buyFeeBps, 0), "NON-NEGATIVE FOT FEES");
    }
    if (sellFeeBps) {
      invariant(JSBI.GE(sellFeeBps, 0), "NON-NEGATIVE FOT FEES");
    }
    this.buyFeeBps = buyFeeBps;
    this.sellFeeBps = sellFeeBps;
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Currency): boolean {
    return (
      other.isToken && this.chainId === other.chainId && this.address.toLowerCase() === other.address.toLowerCase()
    );
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, "CHAIN_IDS");
    invariant(this.address.toLowerCase() !== other.address.toLowerCase(), "ADDRESSES");
    return this.address.toLowerCase() < other.address.toLowerCase();
  }

  /**
   * Return this token, which does not need to be wrapped
   */
  public get wrapped(): Token {
    return this;
  }

  /**
   * Return the blance of address of this token
   */
  public async balanceOf(account: Address, publicClient: PublicClient): Promise<Decimal> {
    const erc20 = getContract({
      abi: [
        {
          type: "function",
          name: "balanceOf",
          inputs: [{ name: "account", type: "address", internalType: "address" }],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
      ],
      address: this.address as `0x${string}`,
      client: publicClient,
    });
    const result = (await erc20.read.balanceOf([account])) as bigint;
    return new Decimal(formatUnits(result, this.decimals));
  }

  /**
   * Return the allowance of address of this token
   */
  public async allowance(owner: Address, spender: Address, publicClient: PublicClient): Promise<Decimal> {
    const erc20 = getContract({
      abi: [
        {
          type: "function",
          name: "allowance",
          inputs: [
            { name: "owner", type: "address", internalType: "address" },
            { name: "spender", type: "address", internalType: "address" },
          ],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
      ],
      address: this.address as `0x${string}`,
      client: publicClient,
    });
    const result = (await erc20.read.allowance([owner, spender])) as bigint;
    return new Decimal(formatUnits(result, this.decimals));
  }

  /**
   * totalSupply of this token
   */

  public async totalSupply(publicClient: PublicClient): Promise<Decimal> {
    const erc20 = getContract({
      abi: [
        {
          type: "function",
          name: "totalSupply",
          inputs: [],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
      ],
      address: this.address as `0x${string}`,
      client: publicClient,
    });
    let result = (await erc20.read.totalSupply()) as bigint;
    return new Decimal(formatUnits(result, this.decimals));
  }
  /**
   * Approve the spender to spend the value of this token
   */
  public async approve(spender: Address, value: bigint, walletClient: WalletClient): Promise<string> {
    const erc20 = getContract({
      abi: [
        {
          type: "function",
          name: "approve",
          inputs: [
            { name: "spender", type: "address", internalType: "address" },
            { name: "value", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
      ],
      address: this.address as `0x${string}`,
      client: {
        wallet: walletClient,
      },
    });
    // @ts-ignore
    return await erc20.write.approve([spender, value]);
  }
}
