type Project = {
    id: number;
    name: string;
    currency: string;
    facebook_url: string;
    instagram_url: string;
    tiktok_url: string;
    linkedin_url: string;
    youtube_url: string;
    categories: Category[];
    logo_id: number;
    logo: Image;
    user_id: number;
    user: User;
    created_at: string;
    updated_at: string;
}
