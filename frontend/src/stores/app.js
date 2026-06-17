import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const DEMO_USERS = [
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

const CATEGORIES = [
  "Horlogerie",
  "Tableaux",
  "Automobiles",
  "Arts de la table",
  "Instruments",
  "Joaillerie",
  "Mobilier",
  "Livres & Manuscrits",
]

function daysFromNow(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString()
}

const INITIAL_LOTS = [
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

const STATUS_LABELS = {
  pending: "En attente",
  live: "En vente",
  sold: "Adjugé",
  rejected: "Refusé",
}

const STATUS_VARIANTS = {
  pending: "outline",
  live: "default", // accent/orange pour statut actif
  sold: "success", // vert pour statut conclu
  rejected: "destructive", // rouge pour statut rejeté
}

function formatPrice(n) {
  return n.toLocaleString("fr-FR") + " €"
}

function timeLeft(endsAt) {
  const diff = new Date(endsAt).getTime() - Date.now()
  if (diff <= 0) return "Terminée"
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  if (days > 0) return `${days} j ${hours} h`
  if (hours > 0) return `${hours} h ${mins} min`
  return `${mins} min`
}

export const useAppStore = defineStore('app', () => {
  const user = ref(null)
  const activeProfile = ref('buyer')
  const lots = ref([...INITIAL_LOTS])
  const activeAdminTab = ref('dashboard')
  const activeBuyerPage = ref('home')
  const activeSellerPage = ref('home')

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  function login(email, password) {
    const found = DEMO_USERS.find(u => u.email === email && u.password === password)
    if (found) {
      user.value = found
      localStorage.setItem('user', JSON.stringify(found))
      return { ok: true }
    }
    return { ok: false, error: 'Identifiants incorrects' }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('auth_token')
  }

  function setActiveProfile(profile) {
    activeProfile.value = profile
  }

  function setActiveAdminTab(tab) {
    activeAdminTab.value = tab
  }

  function setActiveBuyerPage(page) {
    activeBuyerPage.value = page
  }

  function setActiveSellerPage(page) {
    activeSellerPage.value = page
  }

  function placeBid(lotId, amount) {
    const lot = lots.value.find(l => l.id === lotId)
    if (!lot) return { ok: false, error: 'Lot introuvable' }
    if (lot.status !== 'live') return { ok: false, error: 'Enchères closes' }
    if (amount <= lot.currentBid) return { ok: false, error: 'Enchère trop basse' }
    lot.bids.push({
      id: `b${Date.now()}`,
      bidder: user.value?.name || 'Anonyme',
      amount,
      at: new Date().toISOString(),
    })
    lot.currentBid = amount
    return { ok: true }
  }

  function updateLotStatus(lotId, status) {
    const lot = lots.value.find(l => l.id === lotId)
    if (lot) {
      lot.status = status
    }
  }

  function removeLot(lotId) {
    lots.value = lots.value.filter(l => l.id !== lotId)
  }

  function addLot(lot) {
    lots.value.push({
      ...lot,
      id: `lot-${Date.now()}`,
      status: 'pending',
      seller: user.value?.email,
      sellerName: user.value?.name,
      bids: [],
    })
  }

  // Initialize from localStorage
  function init() {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser)
      } catch (e) {
        console.error('Failed to parse user from localStorage')
      }
    }
  }

  init()

  return {
    user,
    activeProfile,
    lots,
    isAuthenticated,
    isAdmin,
    activeAdminTab,
    activeBuyerPage,
    activeSellerPage,
    login,
    logout,
    setActiveProfile,
    setActiveAdminTab,
    setActiveBuyerPage,
    setActiveSellerPage,
    placeBid,
    updateLotStatus,
    removeLot,
    addLot,
    CATEGORIES,
    STATUS_LABELS,
    STATUS_VARIANTS,
    formatPrice,
    timeLeft,
  }
})
