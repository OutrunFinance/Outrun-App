import { Ether } from "@/packages/core";
import { ORETH, ORUSD, OSETH, OSUSD, REY, RUY, USDB } from "./tokens";

export const currencySelectList = [Ether, USDB, ORETH, ORUSD, OSUSD, OSETH, REY, RUY];

export const currencyMintPageSelectList = [Ether, USDB, ORETH, ORUSD];

export const currencyStakePageSelectList = [ORETH, ORUSD];

export const currencyStakePageSelectList2 = [OSETH, OSUSD];

export type CurrencySelectListType = typeof currencySelectList;
