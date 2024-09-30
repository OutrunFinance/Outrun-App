// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { OutrunTypes } from './sources/outrun/types';
import * as importedModule$0 from "./sources/outrun/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type Bundle = {
  id: Scalars['Bytes']['output'];
  ethPrice: Scalars['BigDecimal']['output'];
};

export type Bundle_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  ethPrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPrice_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPrice_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPrice_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPrice_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPrice_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  ethPrice_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  ethPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Bundle_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Bundle_filter>>>;
};

export type Bundle_orderBy =
  | 'id'
  | 'ethPrice';

export type LiquidityPosition = {
  id: Scalars['String']['output'];
  user: User;
  pair: Pair;
  liquidityTokenBalance: Scalars['BigDecimal']['output'];
};

export type LiquidityPosition_filter = {
  id?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_filter>;
  pair?: InputMaybe<Scalars['String']['input']>;
  pair_not?: InputMaybe<Scalars['String']['input']>;
  pair_gt?: InputMaybe<Scalars['String']['input']>;
  pair_lt?: InputMaybe<Scalars['String']['input']>;
  pair_gte?: InputMaybe<Scalars['String']['input']>;
  pair_lte?: InputMaybe<Scalars['String']['input']>;
  pair_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_contains?: InputMaybe<Scalars['String']['input']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_?: InputMaybe<Pair_filter>;
  liquidityTokenBalance?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  liquidityTokenBalance_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  liquidityTokenBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<LiquidityPosition_filter>>>;
  or?: InputMaybe<Array<InputMaybe<LiquidityPosition_filter>>>;
};

export type LiquidityPosition_orderBy =
  | 'id'
  | 'user'
  | 'user__id'
  | 'user__usdSwapped'
  | 'pair'
  | 'pair__id'
  | 'pair__token0Price'
  | 'pair__token1Price'
  | 'pair__reserve0'
  | 'pair__reserve1'
  | 'pair__totalSupply'
  | 'pair__volumeToken0'
  | 'pair__volumeToken1'
  | 'pair__volumeUSD'
  | 'pair__reserveETH'
  | 'pair__reserveUSD'
  | 'pair__liquidityProviderCount'
  | 'liquidityTokenBalance';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Pair = {
  id: Scalars['Bytes']['output'];
  token0: Token;
  token0Price: Scalars['BigDecimal']['output'];
  token1: Token;
  token1Price: Scalars['BigDecimal']['output'];
  reserve0: Scalars['BigDecimal']['output'];
  reserve1: Scalars['BigDecimal']['output'];
  totalSupply: Scalars['BigDecimal']['output'];
  volumeToken0: Scalars['BigDecimal']['output'];
  volumeToken1: Scalars['BigDecimal']['output'];
  volumeUSD: Scalars['BigDecimal']['output'];
  reserveETH: Scalars['BigDecimal']['output'];
  reserveUSD: Scalars['BigDecimal']['output'];
  pairDayData: Array<PairDayData>;
  LiquidityPositions: Array<LiquidityPosition>;
  liquidityProviderCount: Scalars['BigInt']['output'];
};


export type PairpairDayDataArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PairDayData_filter>;
};


export type PairLiquidityPositionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LiquidityPosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidityPosition_filter>;
};

export type PairDayData = {
  id: Scalars['String']['output'];
  date: Scalars['Int']['output'];
  pairAddress: Scalars['Bytes']['output'];
  pair: Pair;
  token0: Token;
  token1: Token;
  reserve0: Scalars['BigDecimal']['output'];
  reserve1: Scalars['BigDecimal']['output'];
  totalSupply?: Maybe<Scalars['BigDecimal']['output']>;
  reserveUSD: Scalars['BigDecimal']['output'];
  dailyVolumeToken0: Scalars['BigDecimal']['output'];
  dailyVolumeToken1: Scalars['BigDecimal']['output'];
  dailyVolumeUSD: Scalars['BigDecimal']['output'];
  dailyTxns: Scalars['BigInt']['output'];
};

export type PairDayData_filter = {
  id?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['Int']['input']>;
  date_not?: InputMaybe<Scalars['Int']['input']>;
  date_gt?: InputMaybe<Scalars['Int']['input']>;
  date_lt?: InputMaybe<Scalars['Int']['input']>;
  date_gte?: InputMaybe<Scalars['Int']['input']>;
  date_lte?: InputMaybe<Scalars['Int']['input']>;
  date_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  date_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  pairAddress?: InputMaybe<Scalars['Bytes']['input']>;
  pairAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  pairAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  pairAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  pairAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  pairAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  pairAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  pairAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  pairAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  pairAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  pair?: InputMaybe<Scalars['String']['input']>;
  pair_not?: InputMaybe<Scalars['String']['input']>;
  pair_gt?: InputMaybe<Scalars['String']['input']>;
  pair_lt?: InputMaybe<Scalars['String']['input']>;
  pair_gte?: InputMaybe<Scalars['String']['input']>;
  pair_lte?: InputMaybe<Scalars['String']['input']>;
  pair_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_contains?: InputMaybe<Scalars['String']['input']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_?: InputMaybe<Pair_filter>;
  token0?: InputMaybe<Scalars['String']['input']>;
  token0_not?: InputMaybe<Scalars['String']['input']>;
  token0_gt?: InputMaybe<Scalars['String']['input']>;
  token0_lt?: InputMaybe<Scalars['String']['input']>;
  token0_gte?: InputMaybe<Scalars['String']['input']>;
  token0_lte?: InputMaybe<Scalars['String']['input']>;
  token0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_contains?: InputMaybe<Scalars['String']['input']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_?: InputMaybe<Token_filter>;
  token1?: InputMaybe<Scalars['String']['input']>;
  token1_not?: InputMaybe<Scalars['String']['input']>;
  token1_gt?: InputMaybe<Scalars['String']['input']>;
  token1_lt?: InputMaybe<Scalars['String']['input']>;
  token1_gte?: InputMaybe<Scalars['String']['input']>;
  token1_lte?: InputMaybe<Scalars['String']['input']>;
  token1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_contains?: InputMaybe<Scalars['String']['input']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_?: InputMaybe<Token_filter>;
  reserve0?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  dailyVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  dailyTxns?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_not?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dailyTxns_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dailyTxns_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PairDayData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PairDayData_filter>>>;
};

export type PairDayData_orderBy =
  | 'id'
  | 'date'
  | 'pairAddress'
  | 'pair'
  | 'pair__id'
  | 'pair__token0Price'
  | 'pair__token1Price'
  | 'pair__reserve0'
  | 'pair__reserve1'
  | 'pair__totalSupply'
  | 'pair__volumeToken0'
  | 'pair__volumeToken1'
  | 'pair__volumeUSD'
  | 'pair__reserveETH'
  | 'pair__reserveUSD'
  | 'pair__liquidityProviderCount'
  | 'token0'
  | 'token0__id'
  | 'token0__symbol'
  | 'token0__name'
  | 'token0__decimals'
  | 'token0__derivedETH'
  | 'token1'
  | 'token1__id'
  | 'token1__symbol'
  | 'token1__name'
  | 'token1__decimals'
  | 'token1__derivedETH'
  | 'reserve0'
  | 'reserve1'
  | 'totalSupply'
  | 'reserveUSD'
  | 'dailyVolumeToken0'
  | 'dailyVolumeToken1'
  | 'dailyVolumeUSD'
  | 'dailyTxns';

export type PairHourData = {
  id: Scalars['Bytes']['output'];
  hourStartUnix: Scalars['Int']['output'];
  pair: Pair;
  reserve0: Scalars['BigDecimal']['output'];
  reserve1: Scalars['BigDecimal']['output'];
  totalSupply?: Maybe<Scalars['BigDecimal']['output']>;
  reserveUSD: Scalars['BigDecimal']['output'];
  hourlyVolumeToken0: Scalars['BigDecimal']['output'];
  hourlyVolumeToken1: Scalars['BigDecimal']['output'];
  hourlyVolumeUSD: Scalars['BigDecimal']['output'];
  hourlyTxns: Scalars['BigInt']['output'];
};

export type PairHourData_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  hourStartUnix?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_not?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_gt?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_lt?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_gte?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_lte?: InputMaybe<Scalars['Int']['input']>;
  hourStartUnix_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  hourStartUnix_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  pair?: InputMaybe<Scalars['String']['input']>;
  pair_not?: InputMaybe<Scalars['String']['input']>;
  pair_gt?: InputMaybe<Scalars['String']['input']>;
  pair_lt?: InputMaybe<Scalars['String']['input']>;
  pair_gte?: InputMaybe<Scalars['String']['input']>;
  pair_lte?: InputMaybe<Scalars['String']['input']>;
  pair_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_contains?: InputMaybe<Scalars['String']['input']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pair_?: InputMaybe<Pair_filter>;
  reserve0?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlyVolumeToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlyVolumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlyVolumeToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlyVolumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlyVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  hourlyVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlyVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  hourlyTxns?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyTxns_not?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyTxns_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyTxns_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyTxns_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyTxns_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hourlyTxns_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hourlyTxns_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PairHourData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PairHourData_filter>>>;
};

export type PairHourData_orderBy =
  | 'id'
  | 'hourStartUnix'
  | 'pair'
  | 'pair__id'
  | 'pair__token0Price'
  | 'pair__token1Price'
  | 'pair__reserve0'
  | 'pair__reserve1'
  | 'pair__totalSupply'
  | 'pair__volumeToken0'
  | 'pair__volumeToken1'
  | 'pair__volumeUSD'
  | 'pair__reserveETH'
  | 'pair__reserveUSD'
  | 'pair__liquidityProviderCount'
  | 'reserve0'
  | 'reserve1'
  | 'totalSupply'
  | 'reserveUSD'
  | 'hourlyVolumeToken0'
  | 'hourlyVolumeToken1'
  | 'hourlyVolumeUSD'
  | 'hourlyTxns';

export type Pair_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  token0?: InputMaybe<Scalars['String']['input']>;
  token0_not?: InputMaybe<Scalars['String']['input']>;
  token0_gt?: InputMaybe<Scalars['String']['input']>;
  token0_lt?: InputMaybe<Scalars['String']['input']>;
  token0_gte?: InputMaybe<Scalars['String']['input']>;
  token0_lte?: InputMaybe<Scalars['String']['input']>;
  token0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_contains?: InputMaybe<Scalars['String']['input']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token0_?: InputMaybe<Token_filter>;
  token0Price?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token0Price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token0Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1?: InputMaybe<Scalars['String']['input']>;
  token1_not?: InputMaybe<Scalars['String']['input']>;
  token1_gt?: InputMaybe<Scalars['String']['input']>;
  token1_lt?: InputMaybe<Scalars['String']['input']>;
  token1_gte?: InputMaybe<Scalars['String']['input']>;
  token1_lte?: InputMaybe<Scalars['String']['input']>;
  token1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_contains?: InputMaybe<Scalars['String']['input']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token1_?: InputMaybe<Token_filter>;
  token1Price?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  token1Price_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  token1Price_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve0?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve1?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken0?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  pairDayData_?: InputMaybe<PairDayData_filter>;
  LiquidityPositions_?: InputMaybe<LiquidityPosition_filter>;
  liquidityProviderCount?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityProviderCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidityProviderCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Pair_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Pair_filter>>>;
};

export type Pair_orderBy =
  | 'id'
  | 'token0'
  | 'token0__id'
  | 'token0__symbol'
  | 'token0__name'
  | 'token0__decimals'
  | 'token0__derivedETH'
  | 'token0Price'
  | 'token1'
  | 'token1__id'
  | 'token1__symbol'
  | 'token1__name'
  | 'token1__decimals'
  | 'token1__derivedETH'
  | 'token1Price'
  | 'reserve0'
  | 'reserve1'
  | 'totalSupply'
  | 'volumeToken0'
  | 'volumeToken1'
  | 'volumeUSD'
  | 'reserveETH'
  | 'reserveUSD'
  | 'pairDayData'
  | 'LiquidityPositions'
  | 'liquidityProviderCount';

export type Query = {
  swapFactory?: Maybe<SwapFactory>;
  swapFactories: Array<SwapFactory>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  pair?: Maybe<Pair>;
  pairs: Array<Pair>;
  pairHourData?: Maybe<PairHourData>;
  pairHourDatas: Array<PairHourData>;
  pairDayData?: Maybe<PairDayData>;
  pairDayDatas: Array<PairDayData>;
  user?: Maybe<User>;
  users: Array<User>;
  liquidityPosition?: Maybe<LiquidityPosition>;
  liquidityPositions: Array<LiquidityPosition>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  stakeORETH?: Maybe<StakeORETH>;
  stakeORETHs: Array<StakeORETH>;
  stakeORUSD?: Maybe<StakeORUSD>;
  stakeORUSDs: Array<StakeORUSD>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryswapFactoryArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryswapFactoriesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SwapFactory_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SwapFactory_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypairArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypairsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Pair_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pair_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypairHourDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypairHourDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairHourData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PairHourData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypairDayDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypairDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PairDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuserArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryusersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryliquidityPositionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryliquidityPositionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LiquidityPosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidityPosition_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybundleArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybundlesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Bundle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bundle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystakeORETHArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystakeORETHsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StakeORETH_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<StakeORETH_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystakeORUSDArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystakeORUSDsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StakeORUSD_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<StakeORUSD_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type StakeORETH = {
  id: Scalars['Bytes']['output'];
  positionId: Scalars['BigInt']['output'];
  account: Scalars['Bytes']['output'];
  amountInORETH: Scalars['BigDecimal']['output'];
  amountInOSETH: Scalars['BigDecimal']['output'];
  amountInREY: Scalars['BigDecimal']['output'];
  status: Scalars['BigInt']['output'];
  deadline: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type StakeORETH_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  positionId?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_not?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  positionId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  account?: InputMaybe<Scalars['Bytes']['input']>;
  account_not?: InputMaybe<Scalars['Bytes']['input']>;
  account_gt?: InputMaybe<Scalars['Bytes']['input']>;
  account_lt?: InputMaybe<Scalars['Bytes']['input']>;
  account_gte?: InputMaybe<Scalars['Bytes']['input']>;
  account_lte?: InputMaybe<Scalars['Bytes']['input']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  amountInORETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInORETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInORETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInORETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInORETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInORETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInORETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountInORETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountInOSETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInOSETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInOSETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInOSETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInOSETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInOSETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInOSETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountInOSETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountInREY?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInREY_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInREY_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInREY_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInREY_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInREY_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInREY_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountInREY_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  status?: InputMaybe<Scalars['BigInt']['input']>;
  status_not?: InputMaybe<Scalars['BigInt']['input']>;
  status_gt?: InputMaybe<Scalars['BigInt']['input']>;
  status_lt?: InputMaybe<Scalars['BigInt']['input']>;
  status_gte?: InputMaybe<Scalars['BigInt']['input']>;
  status_lte?: InputMaybe<Scalars['BigInt']['input']>;
  status_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  status_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deadline?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_not?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_gt?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_lt?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_gte?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_lte?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deadline_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<StakeORETH_filter>>>;
  or?: InputMaybe<Array<InputMaybe<StakeORETH_filter>>>;
};

export type StakeORETH_orderBy =
  | 'id'
  | 'positionId'
  | 'account'
  | 'amountInORETH'
  | 'amountInOSETH'
  | 'amountInREY'
  | 'status'
  | 'deadline'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type StakeORUSD = {
  id: Scalars['Bytes']['output'];
  positionId: Scalars['BigInt']['output'];
  account: Scalars['Bytes']['output'];
  amountInORUSD: Scalars['BigDecimal']['output'];
  amountInOSUSD: Scalars['BigDecimal']['output'];
  amountInRUY: Scalars['BigDecimal']['output'];
  deadline: Scalars['BigInt']['output'];
  status: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type StakeORUSD_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  positionId?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_not?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  positionId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  positionId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  account?: InputMaybe<Scalars['Bytes']['input']>;
  account_not?: InputMaybe<Scalars['Bytes']['input']>;
  account_gt?: InputMaybe<Scalars['Bytes']['input']>;
  account_lt?: InputMaybe<Scalars['Bytes']['input']>;
  account_gte?: InputMaybe<Scalars['Bytes']['input']>;
  account_lte?: InputMaybe<Scalars['Bytes']['input']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  amountInORUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInORUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInORUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInORUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInORUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInORUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInORUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountInORUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountInOSUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInOSUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInOSUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInOSUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInOSUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInOSUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInOSUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountInOSUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountInRUY?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInRUY_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInRUY_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInRUY_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInRUY_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInRUY_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  amountInRUY_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  amountInRUY_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  deadline?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_not?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_gt?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_lt?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_gte?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_lte?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deadline_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  status?: InputMaybe<Scalars['BigInt']['input']>;
  status_not?: InputMaybe<Scalars['BigInt']['input']>;
  status_gt?: InputMaybe<Scalars['BigInt']['input']>;
  status_lt?: InputMaybe<Scalars['BigInt']['input']>;
  status_gte?: InputMaybe<Scalars['BigInt']['input']>;
  status_lte?: InputMaybe<Scalars['BigInt']['input']>;
  status_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  status_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<StakeORUSD_filter>>>;
  or?: InputMaybe<Array<InputMaybe<StakeORUSD_filter>>>;
};

export type StakeORUSD_orderBy =
  | 'id'
  | 'positionId'
  | 'account'
  | 'amountInORUSD'
  | 'amountInOSUSD'
  | 'amountInRUY'
  | 'deadline'
  | 'status'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Subscription = {
  swapFactory?: Maybe<SwapFactory>;
  swapFactories: Array<SwapFactory>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  pair?: Maybe<Pair>;
  pairs: Array<Pair>;
  pairHourData?: Maybe<PairHourData>;
  pairHourDatas: Array<PairHourData>;
  pairDayData?: Maybe<PairDayData>;
  pairDayDatas: Array<PairDayData>;
  user?: Maybe<User>;
  users: Array<User>;
  liquidityPosition?: Maybe<LiquidityPosition>;
  liquidityPositions: Array<LiquidityPosition>;
  bundle?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  stakeORETH?: Maybe<StakeORETH>;
  stakeORETHs: Array<StakeORETH>;
  stakeORUSD?: Maybe<StakeORUSD>;
  stakeORUSDs: Array<StakeORUSD>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionswapFactoryArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionswapFactoriesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SwapFactory_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SwapFactory_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpairArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpairsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Pair_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pair_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpairHourDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpairHourDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairHourData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PairHourData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpairDayDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpairDayDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PairDayData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PairDayData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionuserArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionusersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionliquidityPositionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionliquidityPositionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LiquidityPosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidityPosition_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbundleArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbundlesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Bundle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bundle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstakeORETHArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstakeORETHsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StakeORETH_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<StakeORETH_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstakeORUSDArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstakeORUSDsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StakeORUSD_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<StakeORUSD_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type SwapFactory = {
  id: Scalars['Bytes']['output'];
  pairCount: Scalars['Int']['output'];
  totalVolumeETH: Scalars['BigDecimal']['output'];
  totalLiquidityETH: Scalars['BigDecimal']['output'];
  totalVolumeUSD: Scalars['BigDecimal']['output'];
  untrackedVolumeUSD: Scalars['BigDecimal']['output'];
  totalLiquidityUSD: Scalars['BigDecimal']['output'];
  txCount: Scalars['BigInt']['output'];
};

export type SwapFactory_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  pairCount?: InputMaybe<Scalars['Int']['input']>;
  pairCount_not?: InputMaybe<Scalars['Int']['input']>;
  pairCount_gt?: InputMaybe<Scalars['Int']['input']>;
  pairCount_lt?: InputMaybe<Scalars['Int']['input']>;
  pairCount_gte?: InputMaybe<Scalars['Int']['input']>;
  pairCount_lte?: InputMaybe<Scalars['Int']['input']>;
  pairCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  pairCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalVolumeETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityUSD?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalLiquidityUSD_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalLiquidityUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  txCount?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SwapFactory_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SwapFactory_filter>>>;
};

export type SwapFactory_orderBy =
  | 'id'
  | 'pairCount'
  | 'totalVolumeETH'
  | 'totalLiquidityETH'
  | 'totalVolumeUSD'
  | 'untrackedVolumeUSD'
  | 'totalLiquidityUSD'
  | 'txCount';

export type Token = {
  id: Scalars['Bytes']['output'];
  symbol: Scalars['String']['output'];
  name: Scalars['String']['output'];
  decimals: Scalars['BigInt']['output'];
  derivedETH: Scalars['BigDecimal']['output'];
};

export type Token_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  decimals?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_not?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_gt?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_lt?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_gte?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_lte?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  derivedETH?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  derivedETH_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  derivedETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Token_filter>>>;
};

export type Token_orderBy =
  | 'id'
  | 'symbol'
  | 'name'
  | 'decimals'
  | 'derivedETH';

export type User = {
  id: Scalars['Bytes']['output'];
  liquidityPositions?: Maybe<Array<LiquidityPosition>>;
  usdSwapped: Scalars['BigDecimal']['output'];
};


export type UserliquidityPositionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LiquidityPosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidityPosition_filter>;
};

export type User_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  liquidityPositions_?: InputMaybe<LiquidityPosition_filter>;
  usdSwapped?: InputMaybe<Scalars['BigDecimal']['input']>;
  usdSwapped_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  usdSwapped_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  usdSwapped_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  usdSwapped_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  usdSwapped_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  usdSwapped_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  usdSwapped_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_filter>>>;
  or?: InputMaybe<Array<InputMaybe<User_filter>>>;
};

export type User_orderBy =
  | 'id'
  | 'liquidityPositions'
  | 'usdSwapped';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Aggregation_interval: Aggregation_interval;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bundle: ResolverTypeWrapper<Bundle>;
  Bundle_filter: Bundle_filter;
  Bundle_orderBy: Bundle_orderBy;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  LiquidityPosition: ResolverTypeWrapper<LiquidityPosition>;
  LiquidityPosition_filter: LiquidityPosition_filter;
  LiquidityPosition_orderBy: LiquidityPosition_orderBy;
  OrderDirection: OrderDirection;
  Pair: ResolverTypeWrapper<Pair>;
  PairDayData: ResolverTypeWrapper<PairDayData>;
  PairDayData_filter: PairDayData_filter;
  PairDayData_orderBy: PairDayData_orderBy;
  PairHourData: ResolverTypeWrapper<PairHourData>;
  PairHourData_filter: PairHourData_filter;
  PairHourData_orderBy: PairHourData_orderBy;
  Pair_filter: Pair_filter;
  Pair_orderBy: Pair_orderBy;
  Query: ResolverTypeWrapper<{}>;
  StakeORETH: ResolverTypeWrapper<StakeORETH>;
  StakeORETH_filter: StakeORETH_filter;
  StakeORETH_orderBy: StakeORETH_orderBy;
  StakeORUSD: ResolverTypeWrapper<StakeORUSD>;
  StakeORUSD_filter: StakeORUSD_filter;
  StakeORUSD_orderBy: StakeORUSD_orderBy;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  SwapFactory: ResolverTypeWrapper<SwapFactory>;
  SwapFactory_filter: SwapFactory_filter;
  SwapFactory_orderBy: SwapFactory_orderBy;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  Token: ResolverTypeWrapper<Token>;
  Token_filter: Token_filter;
  Token_orderBy: Token_orderBy;
  User: ResolverTypeWrapper<User>;
  User_filter: User_filter;
  User_orderBy: User_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean']['output'];
  Bundle: Bundle;
  Bundle_filter: Bundle_filter;
  Bytes: Scalars['Bytes']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  LiquidityPosition: LiquidityPosition;
  LiquidityPosition_filter: LiquidityPosition_filter;
  Pair: Pair;
  PairDayData: PairDayData;
  PairDayData_filter: PairDayData_filter;
  PairHourData: PairHourData;
  PairHourData_filter: PairHourData_filter;
  Pair_filter: Pair_filter;
  Query: {};
  StakeORETH: StakeORETH;
  StakeORETH_filter: StakeORETH_filter;
  StakeORUSD: StakeORUSD;
  StakeORUSD_filter: StakeORUSD_filter;
  String: Scalars['String']['output'];
  Subscription: {};
  SwapFactory: SwapFactory;
  SwapFactory_filter: SwapFactory_filter;
  Timestamp: Scalars['Timestamp']['output'];
  Token: Token;
  Token_filter: Token_filter;
  User: User;
  User_filter: User_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BundleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Bundle'] = ResolversParentTypes['Bundle']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  ethPrice?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type LiquidityPositionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['LiquidityPosition'] = ResolversParentTypes['LiquidityPosition']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  pair?: Resolver<ResolversTypes['Pair'], ParentType, ContextType>;
  liquidityTokenBalance?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PairResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Pair'] = ResolversParentTypes['Pair']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token0?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  token0Price?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  token1?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  token1Price?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  reserve0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  reserve1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  reserveETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  reserveUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  pairDayData?: Resolver<Array<ResolversTypes['PairDayData']>, ParentType, ContextType, RequireFields<PairpairDayDataArgs, 'skip' | 'first'>>;
  LiquidityPositions?: Resolver<Array<ResolversTypes['LiquidityPosition']>, ParentType, ContextType, RequireFields<PairLiquidityPositionsArgs, 'skip' | 'first'>>;
  liquidityProviderCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PairDayDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PairDayData'] = ResolversParentTypes['PairDayData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pairAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  pair?: Resolver<ResolversTypes['Pair'], ParentType, ContextType>;
  token0?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  token1?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  reserve0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  reserve1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalSupply?: Resolver<Maybe<ResolversTypes['BigDecimal']>, ParentType, ContextType>;
  reserveUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  dailyVolumeToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  dailyVolumeToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  dailyVolumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  dailyTxns?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PairHourDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PairHourData'] = ResolversParentTypes['PairHourData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  hourStartUnix?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pair?: Resolver<ResolversTypes['Pair'], ParentType, ContextType>;
  reserve0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  reserve1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalSupply?: Resolver<Maybe<ResolversTypes['BigDecimal']>, ParentType, ContextType>;
  reserveUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  hourlyVolumeToken0?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  hourlyVolumeToken1?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  hourlyVolumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  hourlyTxns?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  swapFactory?: Resolver<Maybe<ResolversTypes['SwapFactory']>, ParentType, ContextType, RequireFields<QueryswapFactoryArgs, 'id' | 'subgraphError'>>;
  swapFactories?: Resolver<Array<ResolversTypes['SwapFactory']>, ParentType, ContextType, RequireFields<QueryswapFactoriesArgs, 'skip' | 'first' | 'subgraphError'>>;
  token?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokenArgs, 'id' | 'subgraphError'>>;
  tokens?: Resolver<Array<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  pair?: Resolver<Maybe<ResolversTypes['Pair']>, ParentType, ContextType, RequireFields<QuerypairArgs, 'id' | 'subgraphError'>>;
  pairs?: Resolver<Array<ResolversTypes['Pair']>, ParentType, ContextType, RequireFields<QuerypairsArgs, 'skip' | 'first' | 'subgraphError'>>;
  pairHourData?: Resolver<Maybe<ResolversTypes['PairHourData']>, ParentType, ContextType, RequireFields<QuerypairHourDataArgs, 'id' | 'subgraphError'>>;
  pairHourDatas?: Resolver<Array<ResolversTypes['PairHourData']>, ParentType, ContextType, RequireFields<QuerypairHourDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  pairDayData?: Resolver<Maybe<ResolversTypes['PairDayData']>, ParentType, ContextType, RequireFields<QuerypairDayDataArgs, 'id' | 'subgraphError'>>;
  pairDayDatas?: Resolver<Array<ResolversTypes['PairDayData']>, ParentType, ContextType, RequireFields<QuerypairDayDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserArgs, 'id' | 'subgraphError'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryusersArgs, 'skip' | 'first' | 'subgraphError'>>;
  liquidityPosition?: Resolver<Maybe<ResolversTypes['LiquidityPosition']>, ParentType, ContextType, RequireFields<QueryliquidityPositionArgs, 'id' | 'subgraphError'>>;
  liquidityPositions?: Resolver<Array<ResolversTypes['LiquidityPosition']>, ParentType, ContextType, RequireFields<QueryliquidityPositionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bundle?: Resolver<Maybe<ResolversTypes['Bundle']>, ParentType, ContextType, RequireFields<QuerybundleArgs, 'id' | 'subgraphError'>>;
  bundles?: Resolver<Array<ResolversTypes['Bundle']>, ParentType, ContextType, RequireFields<QuerybundlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  stakeORETH?: Resolver<Maybe<ResolversTypes['StakeORETH']>, ParentType, ContextType, RequireFields<QuerystakeORETHArgs, 'id' | 'subgraphError'>>;
  stakeORETHs?: Resolver<Array<ResolversTypes['StakeORETH']>, ParentType, ContextType, RequireFields<QuerystakeORETHsArgs, 'skip' | 'first' | 'subgraphError'>>;
  stakeORUSD?: Resolver<Maybe<ResolversTypes['StakeORUSD']>, ParentType, ContextType, RequireFields<QuerystakeORUSDArgs, 'id' | 'subgraphError'>>;
  stakeORUSDs?: Resolver<Array<ResolversTypes['StakeORUSD']>, ParentType, ContextType, RequireFields<QuerystakeORUSDsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type StakeORETHResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['StakeORETH'] = ResolversParentTypes['StakeORETH']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  positionId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amountInORETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amountInOSETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amountInREY?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  deadline?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StakeORUSDResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['StakeORUSD'] = ResolversParentTypes['StakeORUSD']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  positionId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amountInORUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amountInOSUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  amountInRUY?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  deadline?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  swapFactory?: SubscriptionResolver<Maybe<ResolversTypes['SwapFactory']>, "swapFactory", ParentType, ContextType, RequireFields<SubscriptionswapFactoryArgs, 'id' | 'subgraphError'>>;
  swapFactories?: SubscriptionResolver<Array<ResolversTypes['SwapFactory']>, "swapFactories", ParentType, ContextType, RequireFields<SubscriptionswapFactoriesArgs, 'skip' | 'first' | 'subgraphError'>>;
  token?: SubscriptionResolver<Maybe<ResolversTypes['Token']>, "token", ParentType, ContextType, RequireFields<SubscriptiontokenArgs, 'id' | 'subgraphError'>>;
  tokens?: SubscriptionResolver<Array<ResolversTypes['Token']>, "tokens", ParentType, ContextType, RequireFields<SubscriptiontokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  pair?: SubscriptionResolver<Maybe<ResolversTypes['Pair']>, "pair", ParentType, ContextType, RequireFields<SubscriptionpairArgs, 'id' | 'subgraphError'>>;
  pairs?: SubscriptionResolver<Array<ResolversTypes['Pair']>, "pairs", ParentType, ContextType, RequireFields<SubscriptionpairsArgs, 'skip' | 'first' | 'subgraphError'>>;
  pairHourData?: SubscriptionResolver<Maybe<ResolversTypes['PairHourData']>, "pairHourData", ParentType, ContextType, RequireFields<SubscriptionpairHourDataArgs, 'id' | 'subgraphError'>>;
  pairHourDatas?: SubscriptionResolver<Array<ResolversTypes['PairHourData']>, "pairHourDatas", ParentType, ContextType, RequireFields<SubscriptionpairHourDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  pairDayData?: SubscriptionResolver<Maybe<ResolversTypes['PairDayData']>, "pairDayData", ParentType, ContextType, RequireFields<SubscriptionpairDayDataArgs, 'id' | 'subgraphError'>>;
  pairDayDatas?: SubscriptionResolver<Array<ResolversTypes['PairDayData']>, "pairDayDatas", ParentType, ContextType, RequireFields<SubscriptionpairDayDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  user?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "user", ParentType, ContextType, RequireFields<SubscriptionuserArgs, 'id' | 'subgraphError'>>;
  users?: SubscriptionResolver<Array<ResolversTypes['User']>, "users", ParentType, ContextType, RequireFields<SubscriptionusersArgs, 'skip' | 'first' | 'subgraphError'>>;
  liquidityPosition?: SubscriptionResolver<Maybe<ResolversTypes['LiquidityPosition']>, "liquidityPosition", ParentType, ContextType, RequireFields<SubscriptionliquidityPositionArgs, 'id' | 'subgraphError'>>;
  liquidityPositions?: SubscriptionResolver<Array<ResolversTypes['LiquidityPosition']>, "liquidityPositions", ParentType, ContextType, RequireFields<SubscriptionliquidityPositionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bundle?: SubscriptionResolver<Maybe<ResolversTypes['Bundle']>, "bundle", ParentType, ContextType, RequireFields<SubscriptionbundleArgs, 'id' | 'subgraphError'>>;
  bundles?: SubscriptionResolver<Array<ResolversTypes['Bundle']>, "bundles", ParentType, ContextType, RequireFields<SubscriptionbundlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  stakeORETH?: SubscriptionResolver<Maybe<ResolversTypes['StakeORETH']>, "stakeORETH", ParentType, ContextType, RequireFields<SubscriptionstakeORETHArgs, 'id' | 'subgraphError'>>;
  stakeORETHs?: SubscriptionResolver<Array<ResolversTypes['StakeORETH']>, "stakeORETHs", ParentType, ContextType, RequireFields<SubscriptionstakeORETHsArgs, 'skip' | 'first' | 'subgraphError'>>;
  stakeORUSD?: SubscriptionResolver<Maybe<ResolversTypes['StakeORUSD']>, "stakeORUSD", ParentType, ContextType, RequireFields<SubscriptionstakeORUSDArgs, 'id' | 'subgraphError'>>;
  stakeORUSDs?: SubscriptionResolver<Array<ResolversTypes['StakeORUSD']>, "stakeORUSDs", ParentType, ContextType, RequireFields<SubscriptionstakeORUSDsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type SwapFactoryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SwapFactory'] = ResolversParentTypes['SwapFactory']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  pairCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalVolumeETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalLiquidityETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalVolumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  untrackedVolumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalLiquidityUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  txCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TokenResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  decimals?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  derivedETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  liquidityPositions?: Resolver<Maybe<Array<ResolversTypes['LiquidityPosition']>>, ParentType, ContextType, RequireFields<UserliquidityPositionsArgs, 'skip' | 'first'>>;
  usdSwapped?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bundle?: BundleResolvers<ContextType>;
  Bytes?: GraphQLScalarType;
  Int8?: GraphQLScalarType;
  LiquidityPosition?: LiquidityPositionResolvers<ContextType>;
  Pair?: PairResolvers<ContextType>;
  PairDayData?: PairDayDataResolvers<ContextType>;
  PairHourData?: PairHourDataResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StakeORETH?: StakeORETHResolvers<ContextType>;
  StakeORUSD?: StakeORUSDResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  SwapFactory?: SwapFactoryResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Token?: TokenResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = OutrunTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/outrun/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const outrunTransforms = [];
const additionalTypeDefs = [] as any[];
const outrunHandler = new GraphqlHandler({
              name: "outrun",
              config: {"endpoint":"https://api.studio.thegraph.com/query/86310/outrun/version/latest"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("outrun"),
              logger: logger.child("outrun"),
              importFn,
            });
sources[0] = {
          name: 'outrun',
          handler: outrunHandler,
          transforms: outrunTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })
const documentHashMap = {
        "f0d6847057618f9e38246a2f42820a61d528abb6d095b9d8cd7ad971d2ca5f7e": PairDocument,
"f0d6847057618f9e38246a2f42820a61d528abb6d095b9d8cd7ad971d2ca5f7e": PoolsDocument,
"f0d6847057618f9e38246a2f42820a61d528abb6d095b9d8cd7ad971d2ca5f7e": LiquidityPositionsDocument,
"dbfdf5b2d8b989a5f718100566b4336b8d6fe9d0c24bc2b9e4bb7f1bd7a1237e": RethPositionDocument,
"dbfdf5b2d8b989a5f718100566b4336b8d6fe9d0c24bc2b9e4bb7f1bd7a1237e": RusdPositionDocument
      }
additionalEnvelopPlugins.push(usePersistedOperations({
        getPersistedOperation(key) {
          return documentHashMap[key];
        },
        ...{}
      }))

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: PairDocument,
        get rawSDL() {
          return printWithCache(PairDocument);
        },
        location: 'PairDocument.graphql',
        sha256Hash: 'f0d6847057618f9e38246a2f42820a61d528abb6d095b9d8cd7ad971d2ca5f7e'
      },{
        document: PoolsDocument,
        get rawSDL() {
          return printWithCache(PoolsDocument);
        },
        location: 'PoolsDocument.graphql',
        sha256Hash: 'f0d6847057618f9e38246a2f42820a61d528abb6d095b9d8cd7ad971d2ca5f7e'
      },{
        document: LiquidityPositionsDocument,
        get rawSDL() {
          return printWithCache(LiquidityPositionsDocument);
        },
        location: 'LiquidityPositionsDocument.graphql',
        sha256Hash: 'f0d6847057618f9e38246a2f42820a61d528abb6d095b9d8cd7ad971d2ca5f7e'
      },{
        document: RethPositionDocument,
        get rawSDL() {
          return printWithCache(RethPositionDocument);
        },
        location: 'RethPositionDocument.graphql',
        sha256Hash: 'dbfdf5b2d8b989a5f718100566b4336b8d6fe9d0c24bc2b9e4bb7f1bd7a1237e'
      },{
        document: RusdPositionDocument,
        get rawSDL() {
          return printWithCache(RusdPositionDocument);
        },
        location: 'RusdPositionDocument.graphql',
        sha256Hash: 'dbfdf5b2d8b989a5f718100566b4336b8d6fe9d0c24bc2b9e4bb7f1bd7a1237e'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type PoolTokenFragment = Pick<Token, 'id' | 'name' | 'symbol' | 'decimals'>;

export type PairQueryVariables = Exact<{
  addr?: InputMaybe<Scalars['Bytes']['input']>;
}>;


export type PairQuery = { pairs: Array<(
    Pick<Pair, 'id' | 'reserveUSD' | 'reserve0' | 'reserve1' | 'totalSupply'>
    & { token0: Pick<Token, 'id' | 'name' | 'symbol' | 'decimals'>, token1: Pick<Token, 'id' | 'name' | 'symbol' | 'decimals'>, pairDayData: Array<Pick<PairDayData, 'reserveUSD' | 'dailyVolumeUSD'>> }
  )> };

export type PoolsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Bytes']['input']>;
}>;


export type PoolsQuery = { pairs: Array<(
    Pick<Pair, 'id' | 'reserve0' | 'reserve1' | 'volumeUSD' | 'reserveUSD'>
    & { token0: Pick<Token, 'id' | 'name' | 'symbol' | 'decimals'>, token1: Pick<Token, 'id' | 'name' | 'symbol' | 'decimals'>, pairDayData: Array<Pick<PairDayData, 'reserveUSD' | 'dailyVolumeUSD'>> }
  )> };

export type LiquidityPositionsQueryVariables = Exact<{
  user?: InputMaybe<Scalars['String']['input']>;
  pair?: InputMaybe<Scalars['String']['input']>;
}>;


export type LiquidityPositionsQuery = { liquidityPositions: Array<(
    Pick<LiquidityPosition, 'liquidityTokenBalance'>
    & { pair: (
      Pick<Pair, 'id' | 'totalSupply' | 'reserve0' | 'reserve1' | 'reserveUSD' | 'volumeUSD'>
      & { token0: Pick<Token, 'id' | 'name' | 'symbol' | 'decimals'>, token1: Pick<Token, 'id' | 'name' | 'symbol' | 'decimals'>, pairDayData: Array<Pick<PairDayData, 'reserveUSD' | 'dailyVolumeUSD'>> }
    ), user: Pick<User, 'id'> }
  )> };

export type RethPositionQueryVariables = Exact<{
  account?: InputMaybe<Scalars['Bytes']['input']>;
}>;


export type RethPositionQuery = { stakeORETHs: Array<Pick<StakeORETH, 'positionId' | 'account' | 'amountInORETH' | 'amountInOSETH' | 'amountInREY' | 'blockNumber' | 'blockTimestamp' | 'transactionHash' | 'deadline' | 'status'>> };

export type RusdPositionQueryVariables = Exact<{
  account?: InputMaybe<Scalars['Bytes']['input']>;
}>;


export type RusdPositionQuery = { stakeORUSDs: Array<Pick<StakeORUSD, 'positionId' | 'account' | 'status' | 'amountInORUSD' | 'amountInOSUSD' | 'amountInRUY' | 'deadline'>> };

export const PoolTokenFragmentDoc = gql`
    fragment PoolToken on Token {
  id
  name
  symbol
  decimals
}
    ` as unknown as DocumentNode<PoolTokenFragment, unknown>;
export const PairDocument = gql`
    query Pair($addr: Bytes) {
  pairs(first: 1, where: {id: $addr}) {
    id
    token0 {
      ...PoolToken
    }
    token1 {
      ...PoolToken
    }
    pairDayData {
      reserveUSD
      dailyVolumeUSD
    }
    reserveUSD
    reserve0
    reserve1
    totalSupply
  }
}
    ${PoolTokenFragmentDoc}` as unknown as DocumentNode<PairQuery, PairQueryVariables>;
export const PoolsDocument = gql`
    query Pools($id: Bytes) {
  pairs(orderBy: reserveUSD, orderDirection: desc, first: 50) {
    id
    token0 {
      ...PoolToken
    }
    token1 {
      ...PoolToken
    }
    reserve0
    reserve1
    volumeUSD
    reserveUSD
    pairDayData {
      reserveUSD
      dailyVolumeUSD
    }
  }
}
    ${PoolTokenFragmentDoc}` as unknown as DocumentNode<PoolsQuery, PoolsQueryVariables>;
export const LiquidityPositionsDocument = gql`
    query LiquidityPositions($user: String, $pair: String) {
  liquidityPositions(
    where: {user: $user, pair: $pair, liquidityTokenBalance_gt: "0"}
    first: 30
    orderBy: liquidityTokenBalance
    orderDirection: desc
  ) {
    pair {
      id
      token0 {
        ...PoolToken
      }
      token1 {
        ...PoolToken
      }
      totalSupply
      reserve0
      reserve1
      reserveUSD
      volumeUSD
      pairDayData {
        reserveUSD
        dailyVolumeUSD
      }
    }
    user {
      id
    }
    liquidityTokenBalance
  }
}
    ${PoolTokenFragmentDoc}` as unknown as DocumentNode<LiquidityPositionsQuery, LiquidityPositionsQueryVariables>;
export const RethPositionDocument = gql`
    query RethPosition($account: Bytes) {
  stakeORETHs(
    orderBy: deadline
    orderDirection: desc
    where: {account: $account, status: 1}
  ) {
    positionId
    account
    amountInORETH
    amountInOSETH
    amountInREY
    blockNumber
    blockTimestamp
    transactionHash
    deadline
    status
  }
}
    ` as unknown as DocumentNode<RethPositionQuery, RethPositionQueryVariables>;
export const RusdPositionDocument = gql`
    query RusdPosition($account: Bytes) {
  stakeORUSDs(
    orderBy: deadline
    orderDirection: desc
    where: {account: $account, status: 1}
  ) {
    positionId
    account
    status
    amountInORUSD
    amountInOSUSD
    amountInRUY
    deadline
  }
}
    ` as unknown as DocumentNode<RusdPositionQuery, RusdPositionQueryVariables>;






export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    Pair(variables?: PairQueryVariables, options?: C): Promise<PairQuery> {
      return requester<PairQuery, PairQueryVariables>(PairDocument, variables, options) as Promise<PairQuery>;
    },
    Pools(variables?: PoolsQueryVariables, options?: C): Promise<PoolsQuery> {
      return requester<PoolsQuery, PoolsQueryVariables>(PoolsDocument, variables, options) as Promise<PoolsQuery>;
    },
    LiquidityPositions(variables?: LiquidityPositionsQueryVariables, options?: C): Promise<LiquidityPositionsQuery> {
      return requester<LiquidityPositionsQuery, LiquidityPositionsQueryVariables>(LiquidityPositionsDocument, variables, options) as Promise<LiquidityPositionsQuery>;
    },
    RethPosition(variables?: RethPositionQueryVariables, options?: C): Promise<RethPositionQuery> {
      return requester<RethPositionQuery, RethPositionQueryVariables>(RethPositionDocument, variables, options) as Promise<RethPositionQuery>;
    },
    RusdPosition(variables?: RusdPositionQueryVariables, options?: C): Promise<RusdPositionQuery> {
      return requester<RusdPositionQuery, RusdPositionQueryVariables>(RusdPositionDocument, variables, options) as Promise<RusdPositionQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;