export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendingEvent: {
        Row: {
          created_at: string
          event_id: string | null
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id?: string | null
          id?: number
          user_id?: string
        }
        Update: {
          created_at?: string
          event_id?: string | null
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendingEvent_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendingEvent_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          age_limit: number
          attendees: string[]
          created_at: string
          created_by: string
          days: Database["public"]["CompositeTypes"]["day"][]
          description: string
          dress_code: Database["public"]["Enums"]["dresscode"]
          id: string
          kit: string[]
          links: string[]
          tags: string[]
          ticket_website: string | null
          title: string
          type: string
        }
        Insert: {
          age_limit?: number
          attendees: string[]
          created_at?: string
          created_by?: string
          days?: Database["public"]["CompositeTypes"]["day"][]
          description: string
          dress_code?: Database["public"]["Enums"]["dresscode"]
          id?: string
          kit: string[]
          links: string[]
          tags: string[]
          ticket_website?: string | null
          title: string
          type?: string
        }
        Update: {
          age_limit?: number
          attendees?: string[]
          created_at?: string
          created_by?: string
          days?: Database["public"]["CompositeTypes"]["day"][]
          description?: string
          dress_code?: Database["public"]["Enums"]["dresscode"]
          id?: string
          kit?: string[]
          links?: string[]
          tags?: string[]
          ticket_website?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      issues: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          fixed: boolean
          id: string
          location: unknown | null
          type: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string
          description?: string | null
          fixed?: boolean
          id?: string
          location?: unknown | null
          type?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          fixed?: boolean
          id?: string
          location?: unknown | null
          type?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          interests: string[]
          location: unknown | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          interests?: string[]
          location?: unknown | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          interests?: string[]
          location?: unknown | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_events_in_range: {
        Args: {
          location_input: unknown
          range_input: number
        }
        Returns: {
          age_limit: number
          attendees: string[]
          created_at: string
          created_by: string
          days: Database["public"]["CompositeTypes"]["day"][]
          description: string
          dress_code: Database["public"]["Enums"]["dresscode"]
          id: string
          kit: string[]
          links: string[]
          tags: string[]
          ticket_website: string | null
          title: string
          type: string
        }[]
      }
      get_issues_in_range: {
        Args: {
          location_input: unknown
          range_input: number
        }
        Returns: {
          created_at: string
          created_by: string
          description: string | null
          fixed: boolean
          id: string
          location: unknown | null
          type: string | null
        }[]
      }
      set_issue_fixed_state: {
        Args: {
          is_fixed: boolean
          issue_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      dresscode: "Casual" | "Formal" | "Anything" | "Costume" | "Festive"
    }
    CompositeTypes: {
      day: {
        event_date: string | null
        start_time: string | null
        end_time: string | null
        location: unknown | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
