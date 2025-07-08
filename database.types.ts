export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      artists: {
        Row: {
          created_at: string
          id: number
          modified_at: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          modified_at?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          modified_at?: string
          name?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          form_source: string
          id: number
          message: string
          modified_at: string
          name: string
          referring_page: string
        }
        Insert: {
          created_at?: string
          email: string
          form_source: string
          id?: number
          message: string
          modified_at?: string
          name: string
          referring_page: string
        }
        Update: {
          created_at?: string
          email?: string
          form_source?: string
          id?: number
          message?: string
          modified_at?: string
          name?: string
          referring_page?: string
        }
        Relationships: []
      }
      currently_reading: {
        Row: {
          author: string
          created_at: string
          date_completed: string | null
          id: number
          image_url: string
          modified_at: string
          name: string
          percent_complete: number
        }
        Insert: {
          author: string
          created_at?: string
          date_completed?: string | null
          id?: number
          image_url: string
          modified_at?: string
          name: string
          percent_complete: number
        }
        Update: {
          author?: string
          created_at?: string
          date_completed?: string | null
          id?: number
          image_url?: string
          modified_at?: string
          name?: string
          percent_complete?: number
        }
        Relationships: []
      }
      genres: {
        Row: {
          created_at: string
          id: number
          modified_at: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          modified_at?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          modified_at?: string
          name?: string
        }
        Relationships: []
      }
      records: {
        Row: {
          artist_id: number
          created_at: string
          discogs_url: string
          id: number
          image_url: string
          modified_at: string
          name: string
          year: number
        }
        Insert: {
          artist_id: number
          created_at?: string
          discogs_url: string
          id?: number
          image_url: string
          modified_at?: string
          name: string
          year: number
        }
        Update: {
          artist_id?: number
          created_at?: string
          discogs_url?: string
          id?: number
          image_url?: string
          modified_at?: string
          name?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "Records_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      records_to_genres: {
        Row: {
          created_at: string
          genre_id: number
          id: number
          modified_at: string
          record_id: number
        }
        Insert: {
          created_at?: string
          genre_id: number
          id?: number
          modified_at?: string
          record_id: number
        }
        Update: {
          created_at?: string
          genre_id?: number
          id?: number
          modified_at?: string
          record_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "RecordsToGenres_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "RecordsToGenres_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "records"
            referencedColumns: ["id"]
          },
        ]
      }
      table_log: {
        Row: {
          created_at: string
          id: number
          log_entry: string
          modified_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          log_entry: string
          modified_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          log_entry?: string
          modified_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const;