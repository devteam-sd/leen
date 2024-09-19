"use client";
import Link from "next/link";
import { CircleUser } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signInWithGithub, signInWithGoogle } from "@/authActions";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    return pathname === href
      ? "text-foreground font-semibold"
      : "text-muted-foreground";
  };

  const toggleTheme = () => {
    console.log("Current theme:", theme);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image
            src="/icon.png"
            alt="Icon"
            width={24}
            height={24}
            className={cn(
              "transition-all duration-300 ease-in-out",
              theme === "dark" ? "invert" : ""
            )}
          />
          <span className="sr-only">SDMVP</span>
        </Link>
        {session && (
          <>
            <Link
              href="/"
              className={`${isActive(
                "/"
              )} transition-colors hover:text-foreground`}
            >
              Dashboard
            </Link>
            <Link
              href="/devices"
              className={`${isActive(
                "/devices"
              )} transition-colors hover:text-foreground`}
            >
              Devices
            </Link>
            <Link
              href="/alerts"
              className={`${isActive(
                "/alerts"
              )} transition-colors hover:text-foreground`}
            >
              Alerts
            </Link>
          </>
        )}
      </nav>

      {/* Mobile menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
              onClick={handleLinkClick}
            >
              <Image
                src="/icon.png"
                alt="Icon"
                width={24}
                height={24}
                className={cn(
                  "transition-all duration-300 ease-in-out",
                  theme === "dark" ? "invert" : ""
                )}
              />
              <span>SDMVP</span>
            </Link>
            {session && (
              <>
                <Link
                  href="/"
                  className={`${isActive("/")} hover:text-foreground`}
                  onClick={handleLinkClick}
                >
                  Dashboard
                </Link>
                <Link
                  href="/devices"
                  className={`${isActive("/devices")} hover:text-foreground`}
                  onClick={handleLinkClick}
                >
                  Devices
                </Link>
                <Link
                  href="/alerts"
                  className={`${isActive("/alerts")} hover:text-foreground`}
                  onClick={handleLinkClick}
                >
                  Alerts
                </Link>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="mr-2"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User avatar"}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              ) : (
                <CircleUser className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {session ? (
              <>
                <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <form action={signInWithGithub}>
                    <button type="submit" className="w-full text-left">
                      Sign in with GitHub
                    </button>
                  </form>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <form action={signInWithGoogle}>
                    <button type="submit" className="w-full text-left">
                      Sign in with Google
                    </button>
                  </form>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
