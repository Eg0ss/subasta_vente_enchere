import type { LotStatus } from "./types"

export function formatPrice(n: number) {
  return n.toLocaleString("fr-FR") + " €"
}

export function timeLeft(endsAt: string) {
  const diff = new Date(endsAt).getTime() - Date.now()
  if (diff <= 0) return "Terminée"
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  if (days > 0) return `${days} j ${hours} h`
  if (hours > 0) return `${hours} h ${mins} min`
  return `${mins} min`
}

export const STATUS_LABELS: Record<LotStatus, string> = {
  pending: "En attente",
  live: "En vente",
  sold: "Adjugé",
  rejected: "Refusé",
}

export function statusVariant(
  status: LotStatus,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "live":
      return "default"
    case "sold":
      return "secondary"
    case "rejected":
      return "destructive"
    default:
      return "outline"
  }
}
