import type { Lot, User } from "./types"

// Comptes de démonstration (maquette — pas de vraie base de données)
export const DEMO_USERS: (User & { password: string })[] = [
  {
    email: "membre@subasta.fr",
    password: "demo",
    name: "Camille Laurent",
    role: "user",
  },
  {
    email: "admin@subasta.fr",
    password: "admin",
    name: "Direction Subasta",
    role: "admin",
  },
]

function daysFromNow(days: number) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString()
}

export const INITIAL_LOTS: Lot[] = [
  {
    id: "lot-1",
    title: "Montre-bracelet or vintage 1968",
    description:
      "Montre habillée en or jaune 18 carats, mouvement mécanique révisé, bracelet cuir d'origine. Provenance documentée.",
    category: "Horlogerie",
    image: "/lots/watch.png",
    startingPrice: 2400,
    currentBid: 3150,
    status: "live",
    seller: "membre@subasta.fr",
    sellerName: "Camille Laurent",
    endsAt: daysFromNow(2),
    bids: [
      { id: "b1", bidder: "Hélène M.", amount: 2600, at: daysFromNow(-2) },
      { id: "b2", bidder: "Théo R.", amount: 2900, at: daysFromNow(-1) },
      { id: "b3", bidder: "Hélène M.", amount: 3150, at: daysFromNow(-0.4) },
    ],
  },
  {
    id: "lot-2",
    title: "Huile sur toile abstraite, signée",
    description:
      "Composition abstraite aux tons chauds, huile sur toile encadrée. Œuvre originale d'un artiste contemporain coté.",
    category: "Tableaux",
    image: "/lots/painting.png",
    startingPrice: 1800,
    currentBid: 1800,
    status: "live",
    seller: "membre@subasta.fr",
    sellerName: "Camille Laurent",
    endsAt: daysFromNow(4),
    bids: [],
  },
  {
    id: "lot-3",
    title: "Coupé sport classique, 1972",
    description:
      "Automobile de collection entièrement restaurée, carrosserie rouge, intérieur cuir. Carnet d'entretien complet.",
    category: "Automobiles",
    image: "/lots/car.png",
    startingPrice: 38000,
    currentBid: 41500,
    status: "live",
    seller: "membre@subasta.fr",
    sellerName: "Camille Laurent",
    endsAt: daysFromNow(6),
    bids: [
      { id: "b4", bidder: "Garage VTM", amount: 39500, at: daysFromNow(-3) },
      { id: "b5", bidder: "Collector92", amount: 41500, at: daysFromNow(-1) },
    ],
  },
  {
    id: "lot-4",
    title: "Vase porcelaine bleu et blanc",
    description:
      "Vase ancien en porcelaine, décor floral bleu sur fond blanc. État de conservation remarquable.",
    category: "Arts de la table",
    image: "/lots/vase.png",
    startingPrice: 650,
    currentBid: 650,
    status: "pending",
    seller: "membre@subasta.fr",
    sellerName: "Camille Laurent",
    endsAt: daysFromNow(7),
    bids: [],
  },
  {
    id: "lot-5",
    title: "Guitare électrique finition sunburst",
    description:
      "Guitare électrique vintage, finition sunburst, micros d'origine. Son chaleureux, instrument de caractère.",
    category: "Instruments",
    image: "/lots/guitar.png",
    startingPrice: 1200,
    currentBid: 1450,
    status: "live",
    seller: "membre@subasta.fr",
    sellerName: "Camille Laurent",
    endsAt: daysFromNow(3),
    bids: [{ id: "b6", bidder: "Studio Onde", amount: 1450, at: daysFromNow(-1) }],
  },
  {
    id: "lot-6",
    title: "Bague solitaire diamant, platine",
    description:
      "Solitaire serti d'un diamant taille brillant sur monture platine. Certificat gemmologique fourni.",
    category: "Joaillerie",
    image: "/lots/ring.png",
    startingPrice: 5400,
    currentBid: 5400,
    status: "pending",
    seller: "membre@subasta.fr",
    sellerName: "Camille Laurent",
    endsAt: daysFromNow(5),
    bids: [],
  },
]

export const CATEGORIES = [
  "Horlogerie",
  "Tableaux",
  "Automobiles",
  "Arts de la table",
  "Instruments",
  "Joaillerie",
  "Mobilier",
  "Livres & Manuscrits",
]
