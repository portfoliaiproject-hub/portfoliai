"use client"

import { useAuth } from "@/hooks/useAuth"
import { usePortfolio } from "@/hooks/usePortfolio"
import { AppHeader } from "@/components/layout/app-header"
import { PortfolioOverview } from "@/components/portfolio/portfolio-overview"
import { AllocationSection } from "@/components/portfolio/allocation-section"
import { HoldingsTable } from "@/components/portfolio/holdings-table"
import { ActivityFull } from "@/components/portfolio/activity-full"
import OnTrackCard from "@/components/OnTrackCard"

export default function PortfolioPage() {
  const { user, loading: authLoading } = useAuth("/")
  const { portfolio } = usePortfolio()

  // Loading state
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your portfolio...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!user) {
    return null // useAuth hook will redirect
  }

  const handleAddHolding = () => {
    // TODO: Implement add holding functionality
    console.log("Add holding clicked")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader user={user} />
      
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Portfolio Overview */}
        <PortfolioOverview
          totalValue={portfolio.totalValue}
          totalGain={portfolio.totalGain}
        />

        {/* On Track Card */}
        <OnTrackCard variant="detailed" />

        {/* Allocation Section */}
        <AllocationSection />

        {/* Holdings Table */}
        <HoldingsTable 
          holdings={portfolio.holdings} 
          onAddHolding={handleAddHolding} 
        />

        {/* Recent Activity */}
        <ActivityFull activities={portfolio.activities} />
      </div>
    </div>
  )
}
