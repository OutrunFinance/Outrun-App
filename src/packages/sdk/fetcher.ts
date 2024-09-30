import { ChainId } from "@/contracts/chains";
import { CurrencyAmount, Token } from "@/packages/core";
import invariant from "tiny-invariant";
import { Address, getContract, PublicClient } from "viem";
import { erc20ABI } from "./abis/ERC20";
import { PairABI } from "./abis/Pair";
import { Pair } from "./entities/pair";

let TOKEN_DECIMALS_CACHE: { [chainId: number]: { [address: string]: number } } = {
  [ChainId.BLAST_SEPOLIA]: {},
  [ChainId.BLAST]: {},
};

// const blastSepoliaClient = createPublicClient({ chain: blastSepolia, transport: http() });
// const blastClient = createPublicClient({ chain: blast, transport: http() });

// export const getDefaultClient = (chainId: ChainId): PublicClient => {
//   switch (chainId) {
//     case ChainId.BLAST_SEPOLIA:
//       return blastSepoliaClient;
//     case ChainId.BLAST:
//       return blastClient;
//     default:
//       return blastClient;
//   }
// };

/**
 * Contains methods for constructing instances of pairs and tokens from on-chain data.
 */
export abstract class Fetcher {
  /**
   * Cannot be constructed.
   */
  private constructor() {}

  /**
   * Fetch information for a given token on the given chain, using the given viem provider.
   * @param chainId chain of the token
   * @param address address of the token on the chain
   * @param provider provider used to fetch the token
   * @param symbol symbol of the token
   * @param name optional name of the token
   */
  public static async fetchTokenData(
    chainId: ChainId,
    address: Address,
    publicClient: PublicClient,
    symbol?: string,
    name?: string,
  ): Promise<Token> {
    const erc20 = getContract({
      abi: erc20ABI,
      address,
      client: publicClient,
    });
    const parsedDecimals =
      typeof TOKEN_DECIMALS_CACHE?.[chainId]?.[address] === "number"
        ? TOKEN_DECIMALS_CACHE[chainId][address]
        : await erc20.read.decimals([]).then((decimals: any) => {
            // @ts-ignore
            TOKEN_DECIMALS_CACHE = {
              ...TOKEN_DECIMALS_CACHE,
              [chainId]: {
                ...TOKEN_DECIMALS_CACHE?.[chainId],
                [address]: decimals,
              },
            };
            // @ts-ignore
            return decimals;
          });
    let _symbol = "";
    if (!symbol) {
      _symbol = (await erc20.read.symbol().catch(() => address)) as string;
    }
    return new Token(chainId, address, parsedDecimals, symbol || _symbol, name);
  }

  /**
   * Fetches information about a pair and constructs a pair from the given two tokens.
   * @param tokenA first token
   * @param tokenB second token
   * @param provider the provider to use to fetch the data
   */
  public static async fetchPairData(tokenA: Token, tokenB: Token, publicClient: PublicClient): Promise<Pair> {
    invariant(tokenA.chainId === tokenB.chainId, "CHAIN_ID");
    const address = Pair.getAddress(tokenA, tokenB) as Address;
    // console.log(address);

    const pairContract = getContract({
      abi: PairABI,
      address,
      client: publicClient,
    });
    const [reserves0, reserves1] = await pairContract.read.getReserves();
    const balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0];
    return new Pair(
      CurrencyAmount.fromRawAmount(tokenA, balances[0].toString()),
      CurrencyAmount.fromRawAmount(tokenB, balances[1].toString()),
    );
  }
}
