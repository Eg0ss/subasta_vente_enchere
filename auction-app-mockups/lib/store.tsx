"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { DEMO_USERS, INITIAL_LOTS } from "@/lib/data"
import type { ActiveProfile, Bid, Lot, LotStatus, User } from "@/lib/types"

type NewLotInput = {
  title: string
  description: string
  category: string
  image: string
  startingPrice: number
  endsAt: string
}

type AppState = {
  user: User | null
  activeProfile: ActiveProfile
  lots: Lot[]
  login: (email: string, password: string) => { ok: boolean; error?: string }
  logout: () => void
  setActiveProfile: (p: ActiveProfile) => void
  placeBid: (lotId: string, amount: number) => { ok: boolean; error?: string }
  createLot: (input: NewLotInput) => void
  updateLotStatus: (lotId: string, status: LotStatus) => void
  removeLot: (lotId: string) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [activeProfile, setActiveProfile] = useState<ActiveProfile>("buyer")
  const [lots, setLots] = useState<Lot[]>(INITIAL_LOTS)

  // Restaure une session de démonstration (sessionStorage uniquement, maquette)
  useEffect(() => {
    const raw = sessionStorage.getItem("subasta-session")
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { user: User; activeProfile: ActiveProfile }
        setUser(parsed.user)
        setActiveProfile(parsed.activeProfile ?? "buyer")
      } catch {
        // ignore
      }
    }
  }, [])

  useEffect(() => {
    if (user) {
      sessionStorage.setItem(
        "subasta-session",
        JSON.stringify({ user, activeProfile }),
      )
    } else {
      sessionStorage.removeItem("subasta-session")
    }
  }, [user, activeProfile])

  const login = useCallback((email: string, password: string) => {
    const found = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
    )
    if (!found || found.password !== password) {
      return { ok: false, error: "Identifiants incorrects." }
    }
    const { password: _pw, ...safe } = found
    setUser(safe)
    setActiveProfile("buyer")
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setActiveProfile("buyer")
  }, [])

  const placeBid = useCallback(
    (lotId: string, amount: number) => {
      if (!user) return { ok: false, error: "Connexion requise." }
      const lot = lots.find((l) => l.id === lotId)
      if (!lot) return { ok: false, error: "Lot introuvable." }
      if (lot.status !== "live")
        return { ok: false, error: "Ce lot n'accepte pas d'enchères." }
      if (amount <= lot.currentBid)
        return {
          ok: false,
          error: `L'enchère doit dépasser ${lot.currentBid.toLocaleString("fr-FR")} €.`,
        }
      const bid: Bid = {
        id: `b-${Date.now()}`,
        bidder: user.name,
        amount,
        at: new Date().toISOString(),
      }
      setLots((prev) =>
        prev.map((l) =>
          l.id === lotId
            ? { ...l, currentBid: amount, bids: [...l.bids, bid] }
            : l,
        ),
      )
      return { ok: true }
    },
    [user, lots],
  )

  const createLot = useCallback(
    (input: NewLotInput) => {
      if (!user) return
      const newLot: Lot = {
        id: `lot-${Date.now()}`,
        title: input.title,
        description: input.description,
        category: input.category,
        image: input.image || "/lots/vase.png",
        startingPrice: input.startingPrice,
        currentBid: input.startingPrice,
        status: "pending",
        seller: user.email,
        sellerName: user.name,
        endsAt: input.endsAt,
        bids: [],
      }
      setLots((prev) => [newLot, ...prev])
    },
    [user],
  )

  const updateLotStatus = useCallback((lotId: string, status: LotStatus) => {
    setLots((prev) =>
      prev.map((l) => (l.id === lotId ? { ...l, status } : l)),
    )
  }, [])

  const removeLot = useCallback((lotId: string) => {
    setLots((prev) => prev.filter((l) => l.id !== lotId))
  }, [])

  const value = useMemo<AppState>(
    () => ({
      user,
      activeProfile,
      lots,
      login,
      logout,
      setActiveProfile,
      placeBid,
      createLot,
      updateLotStatus,
      removeLot,
    }),
    [
      user,
      activeProfile,
      lots,
      login,
      logout,
      placeBid,
      createLot,
      updateLotStatus,
      removeLot,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp doit être utilisé dans AppProvider")
  return ctx
}
