"use client"

import { useMemo } from "react"
import Image from "next/image"
import { Check, X } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useApp } from "@/lib/store"
import {
  STATUS_LABELS,
  formatPrice,
  statusVariant,
} from "@/lib/format"
import type { Lot } from "@/lib/types"

export function AdminView() {
  const { lots, updateLotStatus } = useApp()

  const pending = useMemo(
    () => lots.filter((l) => l.status === "pending"),
    [lots],
  )
  const live = useMemo(() => lots.filter((l) => l.status === "live"), [lots])

  const stats = useMemo(() => {
    const totalValue = lots
      .filter((l) => l.status === "live")
      .reduce((sum, l) => sum + l.currentBid, 0)
    return {
      pending: pending.length,
      live: live.length,
      total: lots.length,
      totalValue,
    }
  }, [lots, pending, live])

  function approve(lot: Lot) {
    updateLotStatus(lot.id, "live")
    toast.success(`« ${lot.title} » est mis en vente.`)
  }
  function reject(lot: Lot) {
    updateLotStatus(lot.id, "rejected")
    toast.error(`« ${lot.title} » a été refusé.`)
  }
  function close(lot: Lot) {
    updateLotStatus(lot.id, "sold")
    toast.success(`« ${lot.title} » adjugé à ${formatPrice(lot.currentBid)}.`)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold">
          Administration de la maison
        </h1>
        <p className="text-muted-foreground">
          Validez les lots soumis et supervisez les ventes en cours.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="À valider" value={String(stats.pending)} highlight />
        <StatCard label="En vente" value={String(stats.live)} />
        <StatCard label="Lots au total" value={String(stats.total)} />
        <StatCard label="Volume en cours" value={formatPrice(stats.totalValue)} />
      </div>

      <Tabs defaultValue="pending" className="mt-8">
        <TabsList>
          <TabsTrigger value="pending">
            À valider ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="live">En vente ({live.length})</TabsTrigger>
          <TabsTrigger value="all">Tous les lots</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          {pending.length === 0 ? (
            <EmptyCard text="Aucun lot en attente de validation." />
          ) : (
            <div className="flex flex-col gap-3">
              {pending.map((lot) => (
                <Card key={lot.id} className="py-0">
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
                      <span className="text-xs text-muted-foreground">
                        {lot.category} · {lot.sellerName}
                      </span>
                      <h3 className="font-serif text-lg font-medium">
                        {lot.title}
                      </h3>
                      <p className="line-clamp-1 text-sm text-muted-foreground">
                        {lot.description || "Sans description"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Mise à prix</p>
                      <p className="font-semibold text-primary">
                        {formatPrice(lot.startingPrice)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5"
                        onClick={() => reject(lot)}
                      >
                        <X className="size-4" />
                        Refuser
                      </Button>
                      <Button
                        size="sm"
                        className="gap-1.5"
                        onClick={() => approve(lot)}
                      >
                        <Check className="size-4" />
                        Valider
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="live" className="mt-4">
          {live.length === 0 ? (
            <EmptyCard text="Aucune vente en cours." />
          ) : (
            <LotTable
              lots={live}
              actionLabel="Clôturer / adjuger"
              onAction={close}
            />
          )}
        </TabsContent>

        <TabsContent value="all" className="mt-4">
          <LotTable lots={lots} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function LotTable({
  lots,
  actionLabel,
  onAction,
}: {
  lots: Lot[]
  actionLabel?: string
  onAction?: (lot: Lot) => void
}) {
  return (
    <Card className="py-0">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lot</TableHead>
              <TableHead>Vendeur</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Enchère</TableHead>
              <TableHead className="text-right">Enchères</TableHead>
              {onAction && <TableHead className="text-right">Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {lots.map((lot) => (
              <TableRow key={lot.id}>
                <TableCell className="font-medium">{lot.title}</TableCell>
                <TableCell className="text-muted-foreground">
                  {lot.sellerName}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant(lot.status)}>
                    {STATUS_LABELS[lot.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatPrice(lot.currentBid)}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {lot.bids.length}
                </TableCell>
                {onAction && (
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onAction(lot)}
                    >
                      {actionLabel}
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <Card className={highlight ? "border-accent" : undefined}>
      <CardContent className="py-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 font-serif text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  )
}

function EmptyCard({ text }: { text: string }) {
  return (
    <Card>
      <CardContent className="py-12 text-center text-muted-foreground">
        {text}
      </CardContent>
    </Card>
  )
}
