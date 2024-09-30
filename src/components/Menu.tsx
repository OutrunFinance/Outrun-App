"use client";
import { useState, useEffect } from "react";
import { NavbarMenu } from "@/constants";
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
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CustomConnectButton } from "./CustomConnectButton";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Menu() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNavItem = (item: { name: string; path: string }) => (
    <NavbarItem key={item.name}>
      <Link
        href={item.path}
        className={`relative px-3 py-2 rounded-md text-base font-medium ${
          pathname === item.path
            ? "text-purple-400"
            : "text-gray-200 hover:text-white"
        } transition-colors duration-300`}
      >
        {item.name}
        {pathname === item.path && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400"
            layoutId="underline"
            initial={false}
          />
        )}
      </Link>
    </NavbarItem>
  );

  return (
    <Navbar
      maxWidth="xl"
      className={`transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-white"
        />
      </NavbarContent>

      <NavbarContent className="pr-3" justify="center">
        <NavbarBrand>
          <Link
            href="/"
            className="font-bold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:from-pink-600 hover:to-purple-400 transition-all duration-300"
          >
            Outrun
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-1" justify="center">
        {NavbarMenu.map((item) => {
          return item.hasChildren ? (
            <Dropdown classNames={{ content: "bg-menu-card text-white min-w-[5rem]" }} key={item.name}>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="bg-transparent text-[1.13rem] text-white hover:text-[#B625FF]"
                    endContent={<img src="/images/arrow_down.svg" alt="arrow down" className="ml-[-0.5rem] mt-1" />}>
                    {item.name}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                className="min-w-[5rem] ml-[-1rem]"
                itemClasses={{
                  base: "gap-4 data-[hover=true]:bg-transparent px-8 min-w-[5rem] menuItem",
                }}>
                {item.children?.map((child) => {
                  return (
                    <DropdownItem key={child.name}>
                      <Link
                        href={child.path}
                        className={`${
                          pathname === child.path ? "text-[#B625FF]" : "text-white"
                        } bg-transparent text-[1rem] hover:text-[#B625FF]`}>
                        {child.name}
                      </Link>
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          ) : (
            renderNavItem({ name: item.name, path: item.path || "" })
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ConnectButton />
        </NavbarItem>
      </NavbarContent>

      <NextUINavbarMenu className="bg-gray-900/95 backdrop-blur-md pt-6">
        {NavbarMenu.map((item) => (
          <NavbarItem
            key={item.name}
            className="flex flex-col items-start py-2"
          >
            {item.hasChildren ? (
              <Dropdown classNames={{ content: "bg-menu-card text-white min-w-[5rem]" }}>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="bg-transparent text-[1.13rem] text-white hover:text-[#B625FF]"
                    endContent={<img src="/images/arrow_down.svg" alt="arrow down" className="ml-[-0.5rem] mt-1" />}>
                    {item.name}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  className="min-w-[5rem] ml-[-1rem]"
                  itemClasses={{
                    base: "gap-4 data-[hover=true]:bg-transparent px-8 min-w-[5rem] menuItem",
                  }}>
                  {item.children?.map((child) => (
                    <DropdownItem key={child.name}>
                      <Link
                        href={child.path}
                        className={`${
                          pathname === child.path ? "text-[#B625FF]" : "text-white"
                        } bg-transparent text-[1rem] hover:text-[#B625FF]`}>
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
          <CustomConnectButton />
        </NavbarItem>
      </NextUINavbarMenu>
    </Navbar>
  );
}
