"use client"

import { useState } from "react"
import Image from "next/image"
import { Clock, Gavel } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useApp } from "@/lib/store"
import { formatPrice, timeLeft } from "@/lib/format"
import type { Lot } from "@/lib/types"

export function LotDetailDialog({
  lot,
  open,
  onOpenChange,
}: {
  lot: Lot | null
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const { placeBid, lots } = useApp()
  const [amount, setAmount] = useState("")

  if (!lot) return null
  // Toujours lire la dernière version du lot depuis le store
  const current = lots.find((l) => l.id === lot.id) ?? lot
  const minBid = current.currentBid + 50

  function submitBid(e: React.FormEvent) {
    e.preventDefault()
    const value = Number(amount)
    if (!value || Number.isNaN(value)) {
      toast.error("Saisissez un montant valide.")
      return
    }
    const res = placeBid(current.id, value)
    if (!res.ok) {
      toast.error(res.error ?? "Enchère refusée.")
      return
    }
    toast.success(`Enchère placée à ${formatPrice(value)}.`)
    setAmount("")
  }

  const sortedBids = [...current.bids].sort((a, b) => b.amount - a.amount)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-3xl">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative aspect-square bg-secondary md:aspect-auto">
            <Image
              src={current.image || "/placeholder.svg"}
              alt={current.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col p-6">
            <DialogHeader className="space-y-2 text-left">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{current.category}</Badge>
                {current.status === "live" ? (
                  <Badge className="gap-1">
                    <Clock className="size-3" />
                    {timeLeft(current.endsAt)}
                  </Badge>
                ) : (
                  <Badge variant="outline">Clôturée</Badge>
                )}
              </div>
              <DialogTitle className="font-serif text-2xl leading-tight">
                {current.title}
              </DialogTitle>
              <DialogDescription className="leading-relaxed">
                {current.description}
              </DialogDescription>
            </DialogHeader>

            <Separator className="my-4" />

            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Enchère actuelle
                </p>
                <p className="font-serif text-3xl font-semibold text-primary">
                  {formatPrice(current.currentBid)}
                </p>
              </div>
              <p className="text-right text-xs text-muted-foreground">
                Mise à prix
                <br />
                {formatPrice(current.startingPrice)}
              </p>
            </div>

            {current.status === "live" ? (
              <form onSubmit={submitBid} className="mt-4 flex flex-col gap-2">
                <Label htmlFor="bid">Votre enchère (min. {formatPrice(minBid)})</Label>
                <div className="flex gap-2">
                  <Input
                    id="bid"
                    type="number"
                    inputMode="numeric"
                    placeholder={String(minBid)}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <Button type="submit" className="gap-1.5">
                    <Gavel className="size-4" />
                    Enchérir
                  </Button>
                </div>
              </form>
            ) : (
              <p className="mt-4 rounded-md bg-secondary p-3 text-sm text-muted-foreground">
                Les enchères sont closes pour ce lot.
              </p>
            )}

            <Separator className="my-4" />

            <div>
              <p className="mb-2 text-sm font-medium">
                Historique des enchères ({sortedBids.length})
              </p>
              {sortedBids.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Aucune enchère pour le moment. Soyez le premier !
                </p>
              ) : (
                <ul className="flex max-h-40 flex-col gap-1.5 overflow-y-auto">
                  {sortedBids.map((b) => (
                    <li
                      key={b.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground">{b.bidder}</span>
                      <span className="font-medium">{formatPrice(b.amount)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
