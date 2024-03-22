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
      ChineseWords: {
        Row: {
          audio_url: string | null
          example_sentences: Json | null
          hsk_level: number | null
          id: number
          pinyinAtone: string | null
          pinyinNumber: string | null
          pinyinTone: string | null
          simplified: string | null
          traditional: string | null
          translation: string | null
        }
        Insert: {
          audio_url?: string | null
          example_sentences?: Json | null
          hsk_level?: number | null
          id?: number
          pinyinAtone?: string | null
          pinyinNumber?: string | null
          pinyinTone?: string | null
          simplified?: string | null
          traditional?: string | null
          translation?: string | null
        }
        Update: {
          audio_url?: string | null
          example_sentences?: Json | null
          hsk_level?: number | null
          id?: number
          pinyinAtone?: string | null
          pinyinNumber?: string | null
          pinyinTone?: string | null
          simplified?: string | null
          traditional?: string | null
          translation?: string | null
        }
        Relationships: []
      }
      Hsk1: {
        Row: {
          id: number
          pinyinAtone: string | null
          pinyinNumber: string | null
          pinyinTone: string | null
          simplified: string | null
          traditional: string | null
          translation: string | null
        }
        Insert: {
          id?: number
          pinyinAtone?: string | null
          pinyinNumber?: string | null
          pinyinTone?: string | null
          simplified?: string | null
          traditional?: string | null
          translation?: string | null
        }
        Update: {
          id?: number
          pinyinAtone?: string | null
          pinyinNumber?: string | null
          pinyinTone?: string | null
          simplified?: string | null
          traditional?: string | null
          translation?: string | null
        }
        Relationships: []
      }
      Hsk2: {
        Row: {
          id: number
          pinyinAtone: string | null
          pinyinNumber: string | null
          pinyinTone: string | null
          simplified: string | null
          traditional: string | null
          translation: string | null
        }
        Insert: {
          id?: number
          pinyinAtone?: string | null
          pinyinNumber?: string | null
          pinyinTone?: string | null
          simplified?: string | null
          traditional?: string | null
          translation?: string | null
        }
        Update: {
          id?: number
          pinyinAtone?: string | null
          pinyinNumber?: string | null
          pinyinTone?: string | null
          simplified?: string | null
          traditional?: string | null
          translation?: string | null
        }
        Relationships: []
      }
      Hsk3: {
        Row: {
          id: number
          pinyinAtone: string | null
          pinyinNumber: string | null
          pinyinTone: string | null
          simplified: string | null
          traditional: string | null
          translation: string | null
        }
        Insert: {
          id?: number
          pinyinAtone?: string | null
          pinyinNumber?: string | null
          pinyinTone?: string | null
          simplified?: string | null
          traditional?: string | null
          translation?: string | null
        }
        Update: {
          id?: number
          pinyinAtone?: string | null
          pinyinNumber?: string | null
          pinyinTone?: string | null
          simplified?: string | null
          traditional?: string | null
          translation?: string | null
        }
        Relationships: []
      }
      Hsk4: {
        Row: {
          id: number
          pinyinAtone: string | null
          pinyinNumber: string | null
          pinyinTone: string | null
          simplified: string | null
          traditional: string | null
          translation: string | null
        }
        Insert: {
          id?: number
          pinyinAtone?: string | null
          pinyinNumber?: string | null
          pinyinTone?: string | null
          simplified?: string | null
          traditional?: string | null
          translation?: string | null
        }
        Update: {
          id?: number
          pinyinAtone?: string | null
          pinyinNumber?: string | null
          pinyinTone?: string | null
          simplified?: string | null
          traditional?: string | null
          translation?: string | null
        }
        Relationships: []
      }
      Hsk5: {
        Row: {
          id: number
          pinyinAtone: string | null
          pinyinNumber: string | null
          pinyinTone: string | null
          simplified: string | null
          traditional: string | null
          translation: string | null
        }
        Insert: {
          id?: number
          pinyinAtone?: string | null
          pinyinNumber?: string | null
          pinyinTone?: string | null
          simplified?: string | null
          traditional?: string | null
          translation?: string | null
        }
        Update: {
          id?: number
          pinyinAtone?: string | null
          pinyinNumber?: string | null
          pinyinTone?: string | null
          simplified?: string | null
          traditional?: string | null
          translation?: string | null
        }
        Relationships: []
      }
      Hsk6: {
        Row: {
          id: number
          pinyinAtone: string | null
          pinyinNumber: string | null
          pinyinTone: string | null
          simplified: string | null
          traditional: string | null
          translation: string | null
        }
        Insert: {
          id?: number
          pinyinAtone?: string | null
          pinyinNumber?: string | null
          pinyinTone?: string | null
          simplified?: string | null
          traditional?: string | null
          translation?: string | null
        }
        Update: {
          id?: number
          pinyinAtone?: string | null
          pinyinNumber?: string | null
          pinyinTone?: string | null
          simplified?: string | null
          traditional?: string | null
          translation?: string | null
        }
        Relationships: []
      }
      Studyboards: {
        Row: {
          content: Json | null
          created_at: string
          created_by: string
          difficulty: Database["public"]["Enums"]["difficulty"] | null
          id: number
          is_public: boolean | null
          language: Database["public"]["Enums"]["language"] | null
          snapshot_url: string | null
          tags: string[] | null
          title: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string
          created_by?: string
          difficulty?: Database["public"]["Enums"]["difficulty"] | null
          id?: number
          is_public?: boolean | null
          language?: Database["public"]["Enums"]["language"] | null
          snapshot_url?: string | null
          tags?: string[] | null
          title?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string
          created_by?: string
          difficulty?: Database["public"]["Enums"]["difficulty"] | null
          id?: number
          is_public?: boolean | null
          language?: Database["public"]["Enums"]["language"] | null
          snapshot_url?: string | null
          tags?: string[] | null
          title?: string | null
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
      difficulty: "0" | "1" | "1+" | "2" | "2+" | "3" | "3+"
      language: "chinese" | "english" | "spanish"
    }
    CompositeTypes: {
      [_ in never]: never
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
