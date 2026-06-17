"use client"

import { useMemo } from "react"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreateLotDialog } from "@/components/create-lot-dialog"
import { useApp } from "@/lib/store"
import {
  STATUS_LABELS,
  formatPrice,
  statusVariant,
  timeLeft,
} from "@/lib/format"

export function SellerView() {
  const { lots, user, removeLot } = useApp()

  const myLots = useMemo(
    () => lots.filter((l) => l.seller === user?.email),
    [lots, user],
  )

  const stats = useMemo(() => {
    const live = myLots.filter((l) => l.status === "live")
    const revenue = myLots
      .filter((l) => l.status === "sold")
      .reduce((sum, l) => sum + l.currentBid, 0)
    const bids = myLots.reduce((sum, l) => sum + l.bids.length, 0)
    return { live: live.length, revenue, bids, total: myLots.length }
  }, [myLots])

  function handleRemove(id: string, title: string) {
    removeLot(id)
    toast.success(`« ${title} » a été retiré.`)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold">Mes lots</h1>
          <p className="text-muted-foreground">
            Gérez vos mises en vente et suivez les enchères.
          </p>
        </div>
        <CreateLotDialog />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Lots déposés" value={String(stats.total)} />
        <StatCard label="En vente" value={String(stats.live)} />
        <StatCard label="Enchères reçues" value={String(stats.bids)} />
        <StatCard label="Produit des ventes" value={formatPrice(stats.revenue)} />
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {myLots.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Vous n&apos;avez encore aucun lot. Cliquez sur « Mettre un lot en
              vente » pour commencer.
            </CardContent>
          </Card>
        ) : (
          myLots.map((lot) => (
            <Card key={lot.id} className="overflow-hidden py-0">
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-secondary">
                  <Image
                    src={lot.image || "/placeholder.svg"}
                    alt={lot.title}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={statusVariant(lot.status)}>
                      {STATUS_LABELS[lot.status]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {lot.category}
                    </span>
                  </div>
                  <h3 className="mt-1 font-serif text-lg font-medium">
                    {lot.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {lot.status === "live"
                      ? `Clôture dans ${timeLeft(lot.endsAt)}`
                      : lot.status === "pending"
                        ? "En attente de validation"
                        : STATUS_LABELS[lot.status]}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {lot.bids.length > 0 ? "Meilleure enchère" : "Mise à prix"}
                    </p>
                    <p className="font-semibold text-primary">
                      {formatPrice(lot.currentBid)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Retirer le lot"
                    onClick={() => handleRemove(lot.id, lot.title)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="py-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 font-serif text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  )
}
