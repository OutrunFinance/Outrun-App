import type { CardContent, DiscoverCard, NavbarItem } from "@/types";

export const outstake: DiscoverCard = {
  title: "Outstake",
  link: "/",
  description: "Control and boost your native yields",
  background: "/images/outstake-home.svg",
  items: [
    {
      icon: "/images/mint.svg",
      title: "Mint & Stake",
      description: "Stake ETH or USDB to earn more yields",
      link: "/staking/liquidstaking",
    },
    {
      icon: "/images/position.svg",
      title: "Position",
      description: "Manage staked position and yield token",
      link: "/staking/position",
    },
    {
      icon: "/images/yield-pool.svg",
      title: "Yield Pool",
      description: "Burn yield token to claim native yield",
      link: "/staking/yieldpool",
    },
  ],
};

export const outrunAMM: DiscoverCard = {
  title: "Outrun AMM",
  link: "/",
  background: "/images/outrun-Amm-home.svg",
  description: "More composable and user-friendly AMM",
  items: [
    {
      icon: "/images/swap.svg",
      title: "Swap",
      description: "Trade crypto assets without a counterparty",
      link: "/trade/swap",
    },
    {
      icon: "/images/liquidity.svg",
      title: "Liquidity",
      description: "Fund liquidity pools, earn trading fees",
      link: "/trade/liquidity",
    },
    {
      icon: "/images/referral.svg",
      title: "Referral",
      description: "Composable On-Chain Referral Bonus Engine",
      link: "/trade/referral",
    },
  ],
};

export const FFLaunch: CardContent = {
  title: "FFLaunch",
  background: "/images/fflaunch.svg",
  text: "Truly community-driven token financing paradigm",
  multiText: [
    "The first Fair and Free Launch standard on the EVM",
    "Provides continuous funding for project teams",
    "Provide deeper liquidity and market exposure for tokens",
    "Provides investors with a risk-free way to participate in token financing",
  ],
  enterLink: "/fflaunch",
  learnLink: "",
};

export const Memeverse: CardContent = {
  title: "Memeverse",
  background: "/images/memeverse.svg",
  text: "Community-driven memecoin fair launch standards",
  multiText: [
    "Integrating native yields, liquidity staking and memecoin",
    "Participate in DeFi activities by joining the Memeverse genesis",
    "No PVP, Just PPP, entering the world of Memecoin with extremely low risk",
    "Provide economic support for the ongoing operation of the Memecoin community",
  ],
  enterLink: "/memeverse",
  learnLink: "",
};

export const CompanyName: string[] = [];

export const NavbarMenu: NavbarItem[] = [
  // {
  //   name: "Trade",
  //   hasChildren: true,
  //   children: [
  //     { name: "Swap", path: "/trade/swap" },
  //     { name: "Liquidity", path: "/trade/liquidity" },
  //     { name: "Referral", path: "/trade/referral" },
  //   ],
  // },
  {
    name: "Markets",
    hasChildren: false,
    path: "/markets",
    children: [],
  },
  // {
  //   name: "Staking",
  //   hasChildren: true,
  //   children: [
  //     { name: "Liquid Staking", path: "/staking/liquidstaking" },
  //     { name: "Position", path: "/staking/position" },
  //     { name: "Yield Pool", path: "/staking/yieldpool" },
  //   ],
  // },
  // {
  //   name: "FFLaunch",
  //   hasChildren: false,
  //   path: "/fflaunch",
  //   children: [],
  // },
  // {
  //   name: "Memeverse",
  //   hasChildren: false,
  //   path: "/memeverse",
  //   children: [],
  // },
];

export const liquidityTableColumns = [
  { key: "id", label: "#" },
  { key: "pool", label: "Pool" },
  { key: "volume", label: "Volumn(24H)" },
  { key: "tcl", label: "TCL" },
  { key: "fees", label: "Fees(24H)" },
  { key: "apr", label: "APR" },
];

export const minLockupDays = 7;
export const maxLockupDays = 365;
export const oneDaySec = 24 * 3600;
