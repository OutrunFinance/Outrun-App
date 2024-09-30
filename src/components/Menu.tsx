"use client"

import { useState, useEffect } from "react"
import { NavbarMenu } from "@/constants"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu as NextUINavbarMenu,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from "@nextui-org/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { ChevronDown, Settings } from "lucide-react"

export function Menu() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const renderNavItem = (item: { name: string; path: string }) => (
    <NavbarItem key={item.name}>
      <Link
        href={item.path}
        className={`px-3 py-2 text-sm font-medium ${
          pathname === item.path
            ? "text-white"
            : "text-gray-300 hover:text-white"
        } transition-colors duration-300`}
      >
        {item.name}
      </Link>
    </NavbarItem>
  )

  return (
    <Navbar
      maxWidth="full"
      className={`transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-gray-900"
      }`}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-gray-300"
        />
      </NavbarContent>

      <NavbarContent className="pr-3" justify="center">
        <NavbarBrand>
          <Link
            href="/"
            className="font-bold text-xl text-white"
          >
            Outrun
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {NavbarMenu.map((item) => {
          return item.hasChildren ? (
            <Dropdown key={item.name}>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="bg-transparent text-sm text-gray-300 hover:text-white"
                    endContent={<ChevronDown className="text-gray-300" size={14} />}
                  >
                    {item.name}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label={`${item.name} dropdown`}
                className="w-[200px] bg-gray-800/90 backdrop-blur-md"
                itemClasses={{
                  base: "text-gray-300 data-[hover=true]:text-white data-[hover=true]:bg-gray-700/50",
                }}
              >
                {item.children?.map((child) => (
                  <DropdownItem key={child.name} className="py-2">
                    <Link
                      href={child.path}
                      className="text-sm font-medium"
                    >
                      {child.name}
                    </Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ) : (
            renderNavItem({ name: item.name, path: item.path || "" })
          )
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
              const ready = mounted
              const connected = ready && account && chain

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button onClick={openConnectModal} type="button" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-sm">
                          Connect Wallet
                        </button>
                      )
                    }

                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} type="button" className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded text-sm">
                          Wrong network
                        </button>
                      )
                    }

                    return (
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button
                          onClick={openChainModal}
                          style={{ display: 'flex', alignItems: 'center' }}
                          type="button"
                          className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded text-sm"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: 'hidden',
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  style={{ width: 12, height: 12 }}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </button>

                        <button onClick={openAccountModal} type="button" className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded text-sm">
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ''}
                        </button>
                      </div>
                    )
                  })()}
                </div>
              )
            }}
          </ConnectButton.Custom>
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly variant="light" aria-label="Settings" className="text-gray-300 hover:text-white">
            <Settings size={20} />
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NextUINavbarMenu className="bg-gray-900 pt-6">
        {NavbarMenu.map((item) => (
          <NavbarItem key={item.name} className="flex flex-col items-start py-2">
            {item.hasChildren ? (
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="bg-transparent text-sm text-gray-300 hover:text-white"
                    endContent={<ChevronDown className="text-gray-300" size={14} />}
                  >
                    {item.name}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label={`${item.name} dropdown`}
                  className="w-[200px] bg-gray-800/90 backdrop-blur-md"
                  itemClasses={{
                    base: "text-gray-300 data-[hover=true]:text-white data-[hover=true]:bg-gray-700/50",
                  }}
                >
                  {item.children?.map((child) => (
                    <DropdownItem key={child.name} className="py-2">
                      <Link
                        href={child.path}
                        className="text-sm font-medium"
                      >
                        {child.name}
                      </Link>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : (
              renderNavItem({ name: item.name, path: item.path || "" })
            )}
          </NavbarItem>
        ))}
        <NavbarItem className="mt-4">
          <ConnectButton />
        </NavbarItem>
      </NextUINavbarMenu>
    </Navbar>
  )
}