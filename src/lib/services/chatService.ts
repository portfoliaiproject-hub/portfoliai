import { supabase } from "@/lib/supabaseClient"
import type { Message, ChatSession, ApiResponse } from "@/types"

/**
 * Chat service class for managing chat sessions and messages
 * Provides CRUD operations for chat functionality with comprehensive error handling
 */
export class ChatService {
  /**
   * Creates a new chat session for a user
   * 
   * @param userId - Unique identifier for the user
   * @param title - Title for the chat session
   * @returns Promise resolving to API response with created session or error
   */
  static async createSession(userId: string, title: string): Promise<ApiResponse<ChatSession>> {
    try {
      // Validate input parameters
      if (!userId || !title) {
        throw new Error("User ID and title are required")
      }

      const { data, error } = await supabase
        .from('chat_sessions')
        .insert([{
          user_id: userId,
          title: title.trim(),
          created_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) {
        console.error("Database error creating session:", error)
        throw error
      }

      return { data, success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create session'
      console.error("ChatService.createSession error:", errorMessage)
      return { 
        error: errorMessage,
        success: false 
      }
    }
  }

  /**
   * Retrieves all chat sessions for a specific user
   * 
   * @param userId - Unique identifier for the user
   * @returns Promise resolving to API response with user sessions or error
   */
  static async getUserSessions(userId: string): Promise<ApiResponse<ChatSession[]>> {
    try {
      if (!userId) {
        throw new Error("User ID is required")
      }

      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error("Database error fetching sessions:", error)
        throw error
      }

      return { data: data || [], success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch sessions'
      console.error("ChatService.getUserSessions error:", errorMessage)
      return { 
        error: errorMessage,
        success: false 
      }
    }
  }

  /**
   * Saves a new message to the database
   * 
   * @param message - Message object to save (without ID)
   * @param sessionId - ID of the session this message belongs to
   * @returns Promise resolving to API response with saved message or error
   */
  static async saveMessage(message: Omit<Message, 'id'>, sessionId: string): Promise<ApiResponse<Message>> {
    try {
      // Validate required message fields
      if (!message.role || !sessionId) {
        throw new Error("Message role and session ID are required")
      }

      const { data, error } = await supabase
        .from('messages')
        .insert([{
          ...message,
          session_id: sessionId,
          created_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) {
        console.error("Database error saving message:", error)
        throw error
      }

      return { data, success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save message'
      console.error("ChatService.saveMessage error:", errorMessage)
      return { 
        error: errorMessage,
        success: false 
      }
    }
  }

  /**
   * Retrieves all messages for a specific chat session
   * 
   * @param sessionId - Unique identifier for the chat session
   * @returns Promise resolving to API response with session messages or error
   */
  static async getSessionMessages(sessionId: string): Promise<ApiResponse<Message[]>> {
    try {
      if (!sessionId) {
        throw new Error("Session ID is required")
      }

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('timestamp', { ascending: true })

      if (error) {
        console.error("Database error fetching messages:", error)
        throw error
      }

      return { data: data || [], success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch messages'
      console.error("ChatService.getSessionMessages error:", errorMessage)
      return { 
        error: errorMessage,
        success: false 
      }
    }
  }

  /**
   * Deletes a chat session and all associated messages
   * 
   * @param sessionId - Unique identifier for the chat session to delete
   * @returns Promise resolving to API response indicating success or error
   */
  static async deleteSession(sessionId: string): Promise<ApiResponse<void>> {
    try {
      if (!sessionId) {
        throw new Error("Session ID is required")
      }

      // First delete all messages in the session
      const { error: messagesError } = await supabase
        .from('messages')
        .delete()
        .eq('session_id', sessionId)

      if (messagesError) {
        console.error("Database error deleting session messages:", messagesError)
        throw messagesError
      }

      // Then delete the session itself
      const { error: sessionError } = await supabase
        .from('chat_sessions')
        .delete()
        .eq('id', sessionId)

      if (sessionError) {
        console.error("Database error deleting session:", sessionError)
        throw sessionError
      }

      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete session'
      console.error("ChatService.deleteSession error:", errorMessage)
      return { 
        error: errorMessage,
        success: false 
      }
    }
  }

  /**
   * Updates a chat session's title
   * 
   * @param sessionId - Unique identifier for the chat session
   * @param title - New title for the session
   * @returns Promise resolving to API response with updated session or error
   */
  static async updateSessionTitle(sessionId: string, title: string): Promise<ApiResponse<ChatSession>> {
    try {
      if (!sessionId || !title) {
        throw new Error("Session ID and title are required")
      }

      const { data, error } = await supabase
        .from('chat_sessions')
        .update({ title: title.trim() })
        .eq('id', sessionId)
        .select()
        .single()

      if (error) {
        console.error("Database error updating session title:", error)
        throw error
      }

      return { data, success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update session title'
      console.error("ChatService.updateSessionTitle error:", errorMessage)
      return { 
        error: errorMessage,
        success: false 
      }
    }
  }
} 