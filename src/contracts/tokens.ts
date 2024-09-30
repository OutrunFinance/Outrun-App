import { Token } from "@/packages/core/entities/token";
import { computePairAddress } from "@/packages/sdk";
import { addressMap } from "./addressMap";
import { ChainId } from "./chains";

export const WETH9: { [chainId: number]: Token } = {
  // blast testnet
  [ChainId.BLAST_SEPOLIA]: new Token(
    ChainId.BLAST_SEPOLIA,
    "0x4200000000000000000000000000000000000023",
    18,
    "WETH",
    "Wrapped Ether",
  ),
  // blast mainnet
  [ChainId.BLAST]: new Token(ChainId.BLAST, "0x4300000000000000000000000000000000000004", 18, "WETH", "Wrapped Ether"),
};

/**
 * Blast usdt like coin: usdb
 */
export const USDB: { [chainId: number]: Token } = {
  // blast testnet
  [ChainId.BLAST_SEPOLIA]: new Token(
    ChainId.BLAST_SEPOLIA,
    "0x4200000000000000000000000000000000000022",
    18,
    "USDB",
    "USDB",
  ),
  // blast mainnet
  [ChainId.BLAST]: new Token(ChainId.BLAST, "0x4200000000000000000000000000000000000022", 18, "USDB", "USDB"),
};

export const RUY: { [chainId: number]: Token } = {
  // blast testnet
  [ChainId.BLAST_SEPOLIA]: new Token(ChainId.BLAST_SEPOLIA, addressMap[ChainId.BLAST_SEPOLIA].RUY, 18, "RUY", "RUY"),
  // blast mainnet
  [ChainId.BLAST]: new Token(ChainId.BLAST, addressMap[ChainId.BLAST_SEPOLIA].RUY, 18, "RUY", "RUY"),
};

export const ORUSD: { [chainId: number]: Token } = {
  // blast testnet
  [ChainId.BLAST_SEPOLIA]: new Token(
    ChainId.BLAST_SEPOLIA,
    addressMap[ChainId.BLAST_SEPOLIA].ORUSD,
    18,
    "orUSD",
    "Outrun USD",
  ),
  // blast mainnet
  [ChainId.BLAST]: new Token(ChainId.BLAST, addressMap[ChainId.BLAST_SEPOLIA].ORUSD, 18, "orUSD", "Outrun USD"),
};

export const REY: { [chainId: number]: Token } = {
  // blast testnet
  [ChainId.BLAST_SEPOLIA]: new Token(ChainId.BLAST_SEPOLIA, addressMap[ChainId.BLAST_SEPOLIA].REY, 18, "REY", "REY"),
  // blast mainnet
  [ChainId.BLAST]: new Token(ChainId.BLAST, addressMap[ChainId.BLAST_SEPOLIA].REY, 18, "REY", "REY"),
};

export const ORETH: { [chainId: number]: Token } = {
  // blast testnet
  [ChainId.BLAST_SEPOLIA]: new Token(
    ChainId.BLAST_SEPOLIA,
    addressMap[ChainId.BLAST_SEPOLIA].ORETH,
    18,
    "orETH",
    "Outrun ETH",
  ),
  // blast mainnet
  [ChainId.BLAST]: new Token(ChainId.BLAST, "0xF62f5dB01cb60d80219F478D5CDffB6398Cee9A5", 18, "orETH", "Outrun ETH"),
};

export const OSUSD: { [chainId: number]: Token } = {
  // blast testnet
  [ChainId.BLAST_SEPOLIA]: new Token(
    ChainId.BLAST_SEPOLIA,
    addressMap[ChainId.BLAST_SEPOLIA].OSUSD,
    18,
    "osUSD",
    "Outrun staked USD",
  ),
  // blast mainnet
  [ChainId.BLAST]: new Token(ChainId.BLAST, addressMap[ChainId.BLAST_SEPOLIA].OSUSD, 18, "osUSD", "Outrun staked USD"),
};

export const OSETH: { [chainId: number]: Token } = {
  // blast testnet
  [ChainId.BLAST_SEPOLIA]: new Token(
    ChainId.BLAST_SEPOLIA,
    addressMap[ChainId.BLAST_SEPOLIA].OSETH,
    18,
    "osETH",
    "Outrun staked ETH",
  ),
  // blast mainnet
  [ChainId.BLAST]: new Token(ChainId.BLAST, addressMap[ChainId.BLAST_SEPOLIA].OSETH, 18, "osETH", "Outrun staked ETH"),
};

computePairAddress({
  factoryAddress: addressMap[ChainId.BLAST_SEPOLIA].SWAP_FACTORY,
  tokenA: ORETH[ChainId.BLAST_SEPOLIA],
  tokenB: ORUSD[ChainId.BLAST_SEPOLIA],
});
