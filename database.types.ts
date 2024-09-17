export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          age_limit: number;
          attendees: string[];
          created_at: string;
          created_by: string;
          days: Database["public"]["CompositeTypes"]["day"][];
          description: string;
          dress_code: Database["public"]["Enums"]["dresscode"];
          id: string;
          kit: string[];
          links: string[];
          location: unknown | null;
          tags: string[];
          ticket_website: string | null;
          title: string;
          type: string;
        };
        Insert: {
          age_limit?: number;
          attendees: string[];
          created_at?: string;
          created_by?: string;
          days?: Database["public"]["CompositeTypes"]["day"][];
          description: string;
          dress_code?: Database["public"]["Enums"]["dresscode"];
          id?: string;
          kit: string[];
          links: string[];
          location?: unknown | null;
          tags: string[];
          ticket_website?: string | null;
          title: string;
          type?: string;
        };
        Update: {
          age_limit?: number;
          attendees?: string[];
          created_at?: string;
          created_by?: string;
          days?: Database["public"]["CompositeTypes"]["day"][];
          description?: string;
          dress_code?: Database["public"]["Enums"]["dresscode"];
          id?: string;
          kit?: string[];
          links?: string[];
          location?: unknown | null;
          tags?: string[];
          ticket_website?: string | null;
          title?: string;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Events_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      issues: {
        Row: {
          created_at: string;
          created_by: string;
          id: number;
          latitude: number;
          longitude: number;
          type: string | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string;
          id?: number;
          latitude: number;
          longitude: number;
          type?: string | null;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          id?: number;
          latitude?: number;
          longitude?: number;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Issues_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          id: string;
          interests: string[];
          location: unknown | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          id: string;
          interests?: string[];
          location?: unknown | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          id?: string;
          interests?: string[];
          location?: unknown | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      dresscode: "Casual" | "Formal" | "Anything" | "Costume" | "Festive";
    };
    CompositeTypes: {
      day: {
        event_date: string | null;
        start_time: string | null;
        end_time: string | null;
        location: unknown | null;
      };
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
