"use client"

import { useState } from "react"
import { Gavel } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApp } from "@/lib/store"

const DEMO = [
  {
    label: "Membre (acheteur / vendeur)",
    email: "membre@subasta.fr",
    password: "demo",
    hint: "Enchérit, vend ses lots, bascule entre les deux profils.",
  },
  {
    label: "Administrateur",
    email: "admin@subasta.fr",
    password: "admin",
    hint: "Valide les lots et supervise la maison de ventes.",
  },
]

export function LoginScreen() {
  const { login } = useApp()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const res = login(email, password)
    if (!res.ok) {
      toast.error(res.error ?? "Connexion impossible.")
      return
    }
    toast.success("Connexion réussie.")
  }

  function quickFill(d: (typeof DEMO)[number]) {
    setEmail(d.email)
    setPassword(d.password)
  }

  return (
    <main className="flex min-h-screen flex-col bg-sidebar text-sidebar-foreground lg:flex-row">
      {/* Volet de présentation */}
      <section className="flex flex-1 flex-col justify-between p-8 lg:p-14">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Gavel className="size-5" />
          </span>
          <span className="font-serif text-2xl font-semibold tracking-tight">
            Subasta
          </span>
        </div>
        <div className="max-w-md py-12">
          <h1 className="text-balance font-serif text-4xl font-semibold leading-tight lg:text-5xl">
            La maison de ventes aux enchères, repensée.
          </h1>
          <p className="mt-5 text-pretty leading-relaxed text-sidebar-foreground/70">
            Enchérissez sur des pièces d&apos;exception, mettez vos propres lots
            en vente et basculez à tout moment entre votre profil acheteur et
            vendeur depuis un seul et même compte.
          </p>
        </div>
        <p className="text-sm text-sidebar-foreground/50">
          Maquette de démonstration — aucune transaction réelle.
        </p>
      </section>

      {/* Volet de connexion */}
      <section className="flex flex-1 items-center justify-center bg-background p-6 text-foreground lg:p-14">
        <div className="w-full max-w-sm">
          <h2 className="font-serif text-2xl font-semibold">Connexion</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Accédez à votre espace personnel.
          </p>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                placeholder="vous@exemple.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="mt-2 w-full">
              Se connecter
            </Button>
          </form>

          <div className="mt-8">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Comptes de démonstration
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {DEMO.map((d) => (
                <button
                  key={d.email}
                  type="button"
                  onClick={() => quickFill(d)}
                  className="rounded-md border border-border bg-card p-3 text-left transition-colors hover:border-accent hover:bg-secondary"
                >
                  <span className="block text-sm font-medium">{d.label}</span>
                  <span className="block text-xs text-muted-foreground">
                    {d.email} — {d.hint}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Cliquez sur un compte pour pré-remplir, puis « Se connecter ».
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
