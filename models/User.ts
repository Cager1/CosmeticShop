type User = {
    id: number;
    name: string;
    email: string;
    status: string;
    role_id: number;
    avatar?: string;
    role?: Role;
    status_id: number;
    created_at: string | Date;
    updated_at: string | Date;
}
