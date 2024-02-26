export type User = {
    avatar_url: string | null;
    credits_remaining: number;
    email: string | null;
    full_name: string | null;
    id: string;
    user_type: "basic" | "premium" | "admin";
} | null