"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Clock, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LotDetailDialog } from "@/components/lot-detail-dialog"
import { useApp } from "@/lib/store"
import { CATEGORIES } from "@/lib/data"
import { formatPrice, timeLeft } from "@/lib/format"
import type { Lot } from "@/lib/types"

export function BuyerView() {
  const { lots, user } = useApp()
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [selected, setSelected] = useState<Lot | null>(null)
  const [open, setOpen] = useState(false)

  const liveLots = useMemo(
    () =>
      lots
        .filter((l) => l.status === "live")
        .filter((l) =>
          category === "all" ? true : l.category === category,
        )
        .filter((l) =>
          query.trim()
            ? l.title.toLowerCase().includes(query.trim().toLowerCase())
            : true,
        ),
    [lots, category, query],
  )

  function openLot(lot: Lot) {
    setSelected(lot)
    setOpen(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-3xl font-semibold">
          Ventes en cours
        </h1>
        <p className="text-muted-foreground">
          Bonjour {user?.name.split(" ")[0]}, voici les lots ouverts aux
          enchères.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un lot…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={category} onValueChange={(v) => setCategory(v ?? "all")}>
          <SelectTrigger className="sm:w-56">
            <SelectValue placeholder="Catégorie">
              {(value: string) =>
                value === "all" ? "Toutes les catégories" : value
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {liveLots.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          Aucun lot ne correspond à votre recherche.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {liveLots.map((lot) => (
            <Card
              key={lot.id}
              onClick={() => openLot(lot)}
              className="group cursor-pointer overflow-hidden pt-0 transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <Image
                  src={lot.image || "/placeholder.svg"}
                  alt={lot.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <Badge className="absolute left-3 top-3 gap-1">
                  <Clock className="size-3" />
                  {timeLeft(lot.endsAt)}
                </Badge>
              </div>
              <CardContent className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {lot.category}
                </span>
                <h3 className="line-clamp-1 font-serif text-lg font-medium">
                  {lot.title}
                </h3>
                <div className="mt-2 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Enchère actuelle
                    </p>
                    <p className="font-semibold text-primary">
                      {formatPrice(lot.currentBid)}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {lot.bids.length} enchère{lot.bids.length > 1 ? "s" : ""}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <LotDetailDialog lot={selected} open={open} onOpenChange={setOpen} />
    </div>
  )
}
