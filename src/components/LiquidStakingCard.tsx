"use client"

import { Tab, Tabs } from "@nextui-org/react"
import { ArrowLeft, Eye } from 'lucide-react'
import MintTab from "./MintTab"
import StakeTab from "./StakeTab"
export default function LiquidStakingCard() {
  return (
    <div className="w-full max-w-3xl bg-gray-900 text-white border border-gray-800 rounded-lg shadow-lg">
      <div className="p-6">
        <Tabs
          aria-label="Yield Pool Tabs"
          color="primary"
          variant="underlined"
          classNames={{
            base: "w-full",
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-primary",
            cursor: "w-full bg-primary",
            panel: "pt-3",
          }}
        >
          <Tab
            key="stake"
            title={
              <div className="flex items-center space-x-2">
                <span>Stake</span>
              </div>
            }
          >
            <StakeTab />
          </Tab>
          <Tab
            key="redeem"
            title={
              <div className="flex items-center space-x-2">
                <span>Redeem</span>
              </div>
            }
          >
            <MintTab />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}