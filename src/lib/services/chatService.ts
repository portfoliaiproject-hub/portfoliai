import { supabase } from "@/lib/supabaseClient"
import type { Message, ChatSession, ApiResponse } from "@/types"

export class ChatService {
  static async createSession(userId: string, title: string): Promise<ApiResponse<ChatSession>> {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert([{
          user_id: userId,
          title,
          created_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw error

      return { data, success: true }
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Failed to create session',
        success: false 
      }
    }
  }

  static async getUserSessions(userId: string): Promise<ApiResponse<ChatSession[]>> {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { data: data || [], success: true }
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Failed to fetch sessions',
        success: false 
      }
    }
  }

  static async saveMessage(message: Omit<Message, 'id'>): Promise<ApiResponse<Message>> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          ...message,
          created_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw error

      return { data, success: true }
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Failed to save message',
        success: false 
      }
    }
  }

  static async getSessionMessages(sessionId: string): Promise<ApiResponse<Message[]>> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('timestamp', { ascending: true })

      if (error) throw error

      return { data: data || [], success: true }
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Failed to fetch messages',
        success: false 
      }
    }
  }

  static async deleteSession(sessionId: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase
        .from('chat_sessions')
        .delete()
        .eq('id', sessionId)

      if (error) throw error

      return { success: true }
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Failed to delete session',
        success: false 
      }
    }
  }
} 