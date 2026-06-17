"use client"

import { AppHeader } from "@/components/app-header"
import { LoginScreen } from "@/components/login-screen"
import { BuyerView } from "@/components/buyer-view"
import { SellerView } from "@/components/seller-view"
import { AdminView } from "@/components/admin-view"
import { useApp } from "@/lib/store"

export default function Page() {
  const { user, activeProfile } = useApp()

  if (!user) {
    return <LoginScreen />
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      {user.role === "admin" ? (
        <AdminView />
      ) : activeProfile === "seller" ? (
        <SellerView />
      ) : (
        <BuyerView />
      )}
    </div>
  )
}
