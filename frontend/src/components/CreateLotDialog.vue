<template>
  <div>
    <Button variant="accent" @click="open = true">
      <svg class="size-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Mettre un lot en vente
    </Button>

    <Dialog :open="open" @update:open="open = $event">
      <DialogHeader>
        <DialogTitle>Nouveau lot</DialogTitle>
        <DialogDescription>Ajoutez un nouveau lot à la vente aux enchères</DialogDescription>
      </DialogHeader>

      <form @submit.prevent="submitLot" class="space-y-4">
        <div>
          <Label for="lot-title">Titre du lot</Label>
          <Input id="lot-title" v-model="newLot.title" placeholder="Ex: Montre vintage..." required />
        </div>
        <div>
          <Label for="lot-category">Catégorie</Label>
          <select
            id="lot-category"
            v-model="newLot.category"
            class="w-full h-10 rounded-md border border-border bg-card px-3 py-2 text-sm text-primary"
            required
          >
            <option v-for="cat in appStore.CATEGORIES" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
        <div>
          <Label for="lot-description">Description</Label>
          <textarea
            id="lot-description"
            v-model="newLot.description"
            placeholder="Description du lot..."
            rows="3"
            class="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          ></textarea>
        </div>
        <div>
          <Label for="lot-price">Mise à prix (€)</Label>
          <Input id="lot-price" v-model.number="newLot.startingPrice" type="number" min="1" placeholder="100" required />
        </div>
        <div>
          <Label for="lot-image">URL de l'image</Label>
          <Input id="lot-image" v-model="newLot.image" placeholder="https://..." />
        </div>
        <Separator />
        <div class="flex justify-end gap-3">
          <Button type="button" variant="outline" @click="open = false">Annuler</Button>
          <Button type="submit">Créer le lot</Button>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import Dialog from '@/components/ui/Dialog.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'
import DialogDescription from '@/components/ui/DialogDescription.vue'
import Button from '@/components/ui/Button.vue'
import Label from '@/components/ui/Label.vue'
import Input from '@/components/ui/Input.vue'
import Separator from '@/components/ui/Separator.vue'

const appStore = useAppStore()

const open = ref(false)
const newLot = ref({
  title: '',
  category: '',
  description: '',
  startingPrice: 100,
  image: ''
})

function submitLot() {
  if (newLot.value.title && newLot.value.category && newLot.value.startingPrice) {
    const lot = {
      ...newLot.value,
      currentBid: newLot.value.startingPrice,
      status: 'pending',
      seller: appStore.user?.email,
      sellerName: appStore.user?.name,
      endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      bids: []
    }
    appStore.addLot(lot)
    open.value = false
    newLot.value = {
      title: '',
      category: '',
      description: '',
      startingPrice: 100,
      image: ''
    }
  }
}
</script>
