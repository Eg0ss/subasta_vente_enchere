"use client"

import { Gavel, LogOut, ShoppingBag, Store, ShieldCheck } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/store"

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function AppHeader() {
  const { user, activeProfile, setActiveProfile, logout } = useApp()
  if (!user) return null

  const isAdmin = user.role === "admin"

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Gavel className="size-4.5" />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight">
            Subasta
          </span>
          {isAdmin && (
            <Badge variant="secondary" className="ml-1 gap-1">
              <ShieldCheck className="size-3" />
              Administration
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Bascule acheteur / vendeur (membres uniquement) */}
          {!isAdmin && (
            <div
              role="tablist"
              aria-label="Basculer de profil"
              className="flex rounded-md border border-border bg-secondary p-0.5"
            >
              <button
                role="tab"
                aria-selected={activeProfile === "buyer"}
                onClick={() => setActiveProfile("buyer")}
                className={cn(
                  "flex items-center gap-1.5 rounded-[0.3rem] px-3 py-1.5 text-sm font-medium transition-colors",
                  activeProfile === "buyer"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <ShoppingBag className="size-4" />
                Acheteur
              </button>
              <button
                role="tab"
                aria-selected={activeProfile === "seller"}
                onClick={() => setActiveProfile("seller")}
                className={cn(
                  "flex items-center gap-1.5 rounded-[0.3rem] px-3 py-1.5 text-sm font-medium transition-colors",
                  activeProfile === "seller"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Store className="size-4" />
                Vendeur
              </button>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="flex h-auto items-center gap-2 px-2 py-1.5"
                />
              }
            >
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                  {initials(user.name)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium sm:block">
                {user.name}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <span className="block">{user.name}</span>
                  <span className="block text-xs font-normal text-muted-foreground">
                    {user.email}
                  </span>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="size-4" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
