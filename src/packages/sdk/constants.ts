import { Percent } from "@/packages/core/entities/fractions/percent";
import JSBI from "jsbi";

// export const FACTORY_ADDRESS_MAP: { [chainId: number]: string } = V2_FACTORY_ADDRESSES;

// copy from \OutswapV1\src\libraries\OutswapV1Library.sol
// export const INIT_CODE_HASH = '0xf34369c1315f6c393c40a626058c08197d799d689082d5f891f9b12588b1ee2d';

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000);

// exports for internal consumption
export const ZERO = JSBI.BigInt(0);
export const ONE = JSBI.BigInt(1);
export const FIVE = JSBI.BigInt(5);
export const _997 = JSBI.BigInt(997);
export const _1000 = JSBI.BigInt(1000);
export const BASIS_POINTS = JSBI.BigInt(10000);

export const ZERO_PERCENT = new Percent(ZERO);
export const ONE_HUNDRED_PERCENT = new Percent(ONE);
