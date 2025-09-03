import { supabase } from "@/lib/supabaseClient"
import type { Portfolio, Holding, ActivityItem, ApiResponse } from "@/types"

export class PortfolioService {
  static async getUserPortfolio(userId: string): Promise<ApiResponse<Portfolio>> {
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .select(`
          *,
          holdings:holdings(*),
          activities:activities(*)
        `)
        .eq('user_id', userId)
        .single()

      if (error) throw error

      return { data, success: true }
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Failed to fetch portfolio',
        success: false 
      }
    }
  }

  static async addHolding(portfolioId: string, holding: Omit<Holding, 'id'>): Promise<ApiResponse<Holding>> {
    try {
      const { data, error } = await supabase
        .from('holdings')
        .insert([{
          ...holding,
          portfolio_id: portfolioId,
          created_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw error

      return { data, success: true }
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Failed to add holding',
        success: false 
      }
    }
  }

  static async updateHolding(holdingId: string, updates: Partial<Holding>): Promise<ApiResponse<Holding>> {
    try {
      const { data, error } = await supabase
        .from('holdings')
        .update(updates)
        .eq('id', holdingId)
        .select()
        .single()

      if (error) throw error

      return { data, success: true }
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Failed to update holding',
        success: false 
      }
    }
  }

  static async getRecentActivity(userId: string, limit = 10): Promise<ApiResponse<ActivityItem[]>> {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error

      return { data: data || [], success: true }
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Failed to fetch activity',
        success: false 
      }
    }
  }

  static async addActivity(activity: Omit<ActivityItem, 'id'>): Promise<ApiResponse<ActivityItem>> {
    try {
      const { data, error } = await supabase
        .from('activities')
        .insert([{
          ...activity,
          created_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw error

      return { data, success: true }
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Failed to add activity',
        success: false 
      }
    }
  }

  static async calculatePortfolioMetrics(holdings: Holding[]): Promise<{
    totalValue: number
    totalGain: number
    totalGainPercent: number
  }> {
    const totalValue = holdings.reduce((sum, holding) => sum + holding.totalValue, 0)
    const totalCost = holdings.reduce((sum, holding) => sum + (holding.shares * holding.avgPrice), 0)
    const totalGain = totalValue - totalCost
    const totalGainPercent = totalCost > 0 ? (totalGain / totalCost) * 100 : 0

    return {
      totalValue,
      totalGain,
      totalGainPercent
    }
  }
} 