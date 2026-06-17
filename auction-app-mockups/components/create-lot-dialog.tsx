"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useApp } from "@/lib/store"
import { CATEGORIES } from "@/lib/data"

const IMAGE_OPTIONS = [
  { label: "Horlogerie", value: "/lots/watch.png" },
  { label: "Tableau", value: "/lots/painting.png" },
  { label: "Automobile", value: "/lots/car.png" },
  { label: "Vase / céramique", value: "/lots/vase.png" },
  { label: "Instrument", value: "/lots/guitar.png" },
  { label: "Joaillerie", value: "/lots/ring.png" },
]

export function CreateLotDialog() {
  const { createLot } = useApp()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState(CATEGORIES[0])
  const [price, setPrice] = useState("")
  const [image, setImage] = useState(IMAGE_OPTIONS[0].value)
  const [days, setDays] = useState("7")

  function reset() {
    setTitle("")
    setDescription("")
    setCategory(CATEGORIES[0])
    setPrice("")
    setImage(IMAGE_OPTIONS[0].value)
    setDays("7")
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const startingPrice = Number(price)
    if (!title.trim() || !startingPrice) {
      toast.error("Renseignez un titre et une mise à prix valides.")
      return
    }
    const endsAt = new Date()
    endsAt.setDate(endsAt.getDate() + Number(days || 7))
    createLot({
      title: title.trim(),
      description: description.trim(),
      category,
      image,
      startingPrice,
      endsAt: endsAt.toISOString(),
    })
    toast.success("Lot soumis. En attente de validation par l'administration.")
    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="gap-1.5">
            <Plus className="size-4" />
            Mettre un lot en vente
          </Button>
        }
      />
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            Nouveau lot
          </DialogTitle>
          <DialogDescription>
            Votre lot sera soumis à validation avant d&apos;être mis en vente.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Titre du lot</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex. Commode marquetée du XVIIIe"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="État, provenance, dimensions…"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Catégorie</Label>
              <Select value={category} onValueChange={(v) => setCategory(v ?? CATEGORIES[0])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Mise à prix (€)</Label>
              <Input
                id="price"
                type="number"
                inputMode="numeric"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="1000"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Visuel</Label>
              <Select value={image} onValueChange={(v) => setImage(v ?? IMAGE_OPTIONS[0].value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {IMAGE_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="days">Durée (jours)</Label>
              <Input
                id="days"
                type="number"
                inputMode="numeric"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="7"
              />
            </div>
          </div>
          <DialogFooter className="mt-2">
            <DialogClose
              render={
                <Button type="button" variant="ghost">
                  Annuler
                </Button>
              }
            />
            <Button type="submit">Soumettre le lot</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
