import React from 'react'
import { ArrowUpDown, Star, TrendingUp, TrendingDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const marketData = [
  { name: 'sUSDE', icon: '🔵', platform: 'Ethena', maturity: '26 Dec 2024', days: 86, liquidity: 71175091, longYield: -85.1, longPrice: 0.02908, fixedAPY: 13.29, fixedPrice: 0.9652 },
  { name: 'sUSDE', icon: '🔵', platform: 'Ethena', maturity: '27 Mar 2025', days: 177, liquidity: 16498710, longYield: -68.2, longPrice: 0.06781, fixedAPY: 15.6, fixedPrice: 0.9265 },
  { name: 'pufETH', icon: '🔹', platform: 'Puffer', maturity: '26 Dec 2024', days: 86, liquidity: 63129596, longYield: -45, longPrice: 24.32, fixedAPY: 4.063, fixedPrice: 2555.56 },
  { name: 'SolvBTC.BBN (Corn)', icon: '🌽', platform: 'Solv Finance (Corn)', maturity: '26 Dec 2024', days: 86, liquidity: 49893498, longYield: -100, longPrice: 1089.66, fixedAPY: 7.478, fixedPrice: 62991.02 },
  { name: 'LBTC (Corn)', icon: '🌽', platform: 'Lombard (Corn)', maturity: '26 Dec 2024', days: 86, liquidity: 33683711, longYield: -100, longPrice: 1071.08, fixedAPY: 7.307, fixedPrice: 63326.28 },
]

export default function EnhancedMarketPage() {
  return (
    <div className="min-h-screen bg-[#030415] text-white p-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-500/10 blur-3xl"></div>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-700">
              <TableHead className="w-[250px] text-gray-300">Name <ArrowUpDown className="ml-2 h-4 w-4 inline" /></TableHead>
              <TableHead className="text-gray-300">Maturity <ArrowUpDown className="ml-2 h-4 w-4 inline" /></TableHead>
              <TableHead className="text-gray-300">Liquidity <ArrowUpDown className="ml-2 h-4 w-4 inline" /></TableHead>
              <TableHead className="text-gray-300">Long Yield APY<br />YT Price</TableHead>
              <TableHead className="text-gray-300">Fixed APY<br />PT Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marketData.map((item, index) => (
              <TableRow
                key={item.name + item.maturity}
                className={`${index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'} backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-gray-700/30`}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full mr-3 flex items-center justify-center text-2xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-110">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center">
                        {item.name}
                        <div className="ml-2 text-yellow-500 transition-transform duration-300 ease-in-out hover:scale-125 hover:rotate-180">
                          <Star className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">{item.platform}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>{item.maturity}</div>
                  <div className="text-sm text-gray-400">{item.days} days</div>
                </TableCell>
                <TableCell>
                  <div className="transition-all duration-300 ease-in-out hover:scale-105">
                    ${item.liquidity.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-pink-900/50 p-3 rounded-md inline-block min-w-[120px] shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
                    <div className="text-blue-400 font-semibold">YT</div>
                    <div className="text-lg font-bold flex items-center">
                      {item.longYield}%
                      {item.longYield < 0 ? (
                        <TrendingDown className="ml-1 h-4 w-4 text-red-500" />
                      ) : (
                        <TrendingUp className="ml-1 h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="text-sm text-gray-300">${item.longPrice.toFixed(5)}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-blue-900/50 p-3 rounded-md inline-block min-w-[120px] shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
                    <div className="text-purple-400 font-semibold">PT</div>
                    <div className="text-lg font-bold">{item.fixedAPY}%</div>
                    <div className="text-sm text-gray-300">${item.fixedPrice.toFixed(4)}</div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-center text-sm text-gray-300">
          Showing popular pools (10 of 41).{' '}
          <Button
            variant="link"
            className="text-blue-400 hover:text-purple-300 transition-colors duration-300"
          >
            Show All
          </Button>
        </div>
      </div>
    </div>
  )
}