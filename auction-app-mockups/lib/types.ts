export type AccountRole = "user" | "admin"
export type ActiveProfile = "buyer" | "seller"

export type LotStatus = "pending" | "live" | "sold" | "rejected"

export type Bid = {
  id: string
  bidder: string
  amount: number
  at: string // ISO date
}

export type Lot = {
  id: string
  title: string
  description: string
  category: string
  image: string
  startingPrice: number
  currentBid: number
  status: LotStatus
  seller: string
  sellerName: string
  endsAt: string // ISO date
  bids: Bid[]
}

export type User = {
  email: string
  name: string
  role: AccountRole
}
