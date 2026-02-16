export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      company: {
        Row: {
          id: string;
          name: string;
          description?: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          name: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id: string;
          name: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      profiles: {
        Row: {
          id: string;
          company_id: string;
          full_name: string | null;
          avatar_url: string | null;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelationship: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profiles_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelationship: "company";
            referencedColumns: ["id"];
          },
        ];
      };

      clients: {
        Row: {
          id: string;
          company_id: string;
          full_name: string;
          phone: string | null;
          location: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          full_name: string;
          phone?: string | null;
          location?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          full_name?: string;
          phone?: string | null;
          location?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "clients_company_id_fkey";
            column: ["company_id"];
            isOnToOne: false;
            referencedRelationship: "company";
            referencedColumns: ["id"];
          },
        ];
      };

      jobs: {
        Row: {
          id: string;
          company_id: string;
          client_id: string;
          assigned_to: string;
          job_number: string;
          title: string;
          job_progress?:
            | "scheduled"
            | "in-progress"
            | "on-hold"
            | "completed"
            | "cancelled";
          payment_status?: "unpaid" | "partial" | "paid";
          amount: number | null;
          startDate: string | null;
          dueDate: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          client_id: string;
          assigned_to: string;
          job_number: string;
          title: string;
          job_progress?:
            | "scheduled"
            | "in-progress"
            | "on-hold"
            | "completed"
            | "cancelled";
          payment_status?: "unpaid" | "partial" | "paid";
          amount?: number | null;
          startDate?: string | null;
          dueDate?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          client_id?: string;
          assigned_to?: string;
          job_number?: string;
          title?: string;
          job_progress?:
            | "scheduled"
            | "in-progress"
            | "on-hold"
            | "completed"
            | "cancelled";
          payment_status?: "unpaid" | "partial" | "paid";
          amount?: number | null;
          startDate?: string | null;
          dueDate?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey";
            column: ["company_id"];
            isOneToOne: false;
            referencedRelationship: "company";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "jobs_clients_id_fkey";
            column: ["client_id"];
            isOneToOne: false;
            referencedRelationship: "clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "jobs_assigned_to_fkey";
            column: ["assigned_to"];
            isOneToOne: false;
            referencedRelationship: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
  };
}

export type Company = Database["public"]["Tables"]["company"]["Row"];
export type InsertCompany = Database["public"]["Tables"]["company"]["Insert"];
export type UpdateCompany = Database["public"]["Tables"]["company"]["Update"];

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type InsertProfile = Database["public"]["Tables"]["profiles"]["Insert"];
export type UpdateProfile = Database["public"]["Tables"]["profiles"]["Update"];

export type Client = Database["public"]["Tables"]["clients"]["Row"];
export type InsertClient = Database["public"]["Tables"]["clients"]["Insert"];
export type UpdateClient = Database["public"]["Tables"]["clients"]["Update"];

export type Job = Database["public"]["Tables"]["jobs"]["Row"];
export type InsertJob = Database["public"]["Tables"]["jobs"]["Insert"];
export type UpdateJob = Database["public"]["Tables"]["jobs"]["Update"];

// Instead of manual strings, extract it directly from the Database type:
export type JobStatus =
  Database["public"]["Tables"]["jobs"]["Row"]["job_progress"];
export type PaymentStatus =
  Database["public"]["Tables"]["jobs"]["Row"]["payment_status"];

// enum types
// export type JobStatus = "scheduled" | "in-progress" | "completed" | "cancelled";
// export type PaymentStatus = "unpaid" | "partial" | "paid";
export type UserRole = "admin" | "member";
